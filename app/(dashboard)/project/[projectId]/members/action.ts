"use server";
import { apiFetch } from "@/lib/api";
import { IMember } from "@/types/types";
export type InviteType = {
  p_email: string;
  p_project_id: string;
  p_app_url: string;
  p_base_url: string;
};

export async function getMembers(projectId: string) {
  try {
    const res = await apiFetch<IMember[]>(
      `/rest/v1/get_project_members?project_id=eq.${projectId}`,
      {
        method: "GET",
      },
    );
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Get Members failed");
    }
    throw new Error("Get Members failed due to an unknown error");
  }
}
export async function inviteMember(data: InviteType) {
  try {
    const res = await apiFetch<IMember[]>(`/rest/v1/rpc/invite_member`, {
      method: "POST",
      body: data,
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Get Members failed");
    }
    throw new Error("Get Members failed due to an unknown error");
  }
}
