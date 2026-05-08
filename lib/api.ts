"use server";

import { cookies } from "next/headers";
import { refreshAccessToken } from "./auth/refresh";

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type RequestOptions<B=unknown> = {
  method: "GET" | "POST" | "PUT" | "DELETE"| "PATCH";
  body?: B;
  headers?: Record<string, string>;
  includeCount?: boolean;
};

export async function apiFetch<T, B = unknown>(
  endpoint: string,
  options: RequestOptions<B> & { includeCount: true }
): Promise<{ data: T; count: number | null }>;

export async function apiFetch<T, B = unknown>(
  endpoint: string,
  options: RequestOptions<B> & { includeCount?: false }
): Promise<T>;

export async function apiFetch<T, B = unknown>(
  endpoint: string,
  options: RequestOptions<B>
): Promise<T | { data: T; count: number | null }> {
  const cookieStore = await cookies();
  let token = cookieStore.get("access_token")?.value;
  const makeRequest = (token?: string) => {
    return fetch(`${baseUrl}${endpoint}`, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: anonKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  };

  let res = await makeRequest(token);

  if (res.status === 401) {
    try {
      token = await refreshAccessToken();
      res = await makeRequest(token);
    } catch (err) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      throw new Error("SESSION_EXPIRED");
    }
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  if (options.includeCount) {
    const range = res.headers.get("content-range");
    const count = range ? parseInt(range.split("/")[1], 10) : null;
    return { data, count };
  }

  return data;
}