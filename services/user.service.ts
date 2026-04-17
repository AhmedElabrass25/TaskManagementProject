import { apiFetch } from "@/lib/api";

export type UserMetaData = {
  name: string;
  email: string;
  department?: string;
};
export function mapUser(user: any): UserMetaData {
  return {
    name: user.user_metadata?.name,
    email: user.user_metadata?.email,
    department: user.user_metadata?.department,
  };
}

export async function getCurrentUser(): Promise<UserMetaData> {
  const data = await apiFetch<any>("/auth/v1/user", {
    method: "GET",
  });
  return mapUser(data);
}