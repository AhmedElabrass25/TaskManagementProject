"use server";

type ForgotType = {
  email: string;
};

export async function recoverPassword(user: ForgotType) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify({
          email: user.email,
          options: {
            redirectTo:"http://localhost:3001/reset-password", 
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Recovery failed");
    }
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Recovery failed",
    };
  }
}