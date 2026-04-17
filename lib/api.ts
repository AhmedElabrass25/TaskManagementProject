"use server";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
if (!baseUrl) {
  throw new Error("BASE URL is missing. Check .env.local");
}
type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions,
): Promise<T> {
  const { method = "GET", body } = options;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Prefer: "return=representation",

      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data.msg || "Something went wrong");
  }

  return data;
}
