"use server";

import { cookies } from "next/headers";

export async function loginUser(user: {
  email: string;
  password: string;
  remember?: boolean;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  const cookieStore = await cookies();

  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: user.remember
        ? 60 * 60 * 24 * 30 // 30 days
        : undefined,
  });

  return data;
}