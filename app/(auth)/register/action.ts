"use server";

import { cookies } from "next/headers";

export async function registerUser(user: {
  name: string;
  email: string;
  password: string;
  department?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        data: {
          name: user.name,
          job_title: user.department,
        },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Signup failed");
  }

  const cookieStore = await cookies();

  if (data.access_token) {
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (data.refresh_token) {
    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
       secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return data;
}