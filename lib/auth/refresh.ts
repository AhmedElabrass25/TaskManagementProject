"use server";

import { cookies } from "next/headers";
export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    throw new Error("NO_REFRESH_TOKEN");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    throw new Error("REFRESH_FAILED");
  }

  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
    path: "/",
  });

  cookieStore.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    path: "/",
  });

  return data.access_token;
}