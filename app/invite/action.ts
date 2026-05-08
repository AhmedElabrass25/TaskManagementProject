import { apiFetch } from "@/lib/api";

export async function acceptInvite(token?: string) {
  await apiFetch<void>(`/rest/v1/rpc/accept_invitation`, {
    method: "POST",
    body: {
      p_token: token,
    },
  });
}
