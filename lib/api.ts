"use server";

import { cookies } from "next/headers";
import { refreshAccessToken } from "./auth/refresh";

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions
): Promise<T> {
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

  return data;
}