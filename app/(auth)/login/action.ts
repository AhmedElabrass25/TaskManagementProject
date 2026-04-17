"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";

type loginUser = {
    email: string;
    password: string;
   

}
type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: any;
};
export async function loginUser(user: loginUser) {
  console.log(user);
    try{
    const res = await apiFetch<AuthResponse>("/auth/v1/token?grant_type=password", {
        method: "POST",
        body: {
            email: user.email,
            password: user.password,
        },
    });
    const cookieStore = await cookies();
    cookieStore.set("access_token", res.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("refresh_token", res.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    } catch (error: any) {
    throw new Error(error.message || "Login failed");
}

}
       

