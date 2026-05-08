"use server";

import { apiFetch } from "@/lib/api";

type AddEpic = {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
};
export async function addEpic(ebic: AddEpic) {
  try {
    const res = await apiFetch<AddEpic>("/rest/v1/epics", {
      method: "POST",
      body: {
        title: ebic.title,
        description: ebic.description,
        assignee_id: ebic.assignee_id,
        project_id: ebic.project_id,
        deadline: ebic.deadline,
      },
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Ebic creation failed");
    }
    throw new Error("Ebic creation failed due to an unknown error");
  }
}
