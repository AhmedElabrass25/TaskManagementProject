"use server";

export async function updatePassword(
  password: string,
  accessToken: string
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${accessToken}`, // 🔥 أهم حاجة
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update password");
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}