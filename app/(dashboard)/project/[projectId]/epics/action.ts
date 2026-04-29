"use server";

import { apiFetch } from "@/lib/api";
import { title } from "process";
export type UpdateEpicData = {
  id: string;
  title: string;
  description?: string;
  assignee_id?: string | null;
  deadline?: string | null;
};
export async function getAllEpicsPaginated({
  limit,
  offset,
  projectId,
}: {
  limit: number;
  offset: number;
  projectId: string;
}) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch epics");
    }
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch epics");
  }
}
export async function getAllEpics(projectId: string) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_epics?project_id=eq.${projectId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch epics");
    }
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch epics");
  }
}
// export async function updateEpic(epicData: UpdateEpicData) {
//   console.log(epicData);
//   try {
//     const res = await apiFetch<any>(`/rest/v1/epics?id=eq.${epicData.id}`, {
//       method: "PATCH",
//       body: {
//         title: epicData.title,
//         description: epicData.description,
//         assignee_id: epicData.assignee_id,
//         deadline: epicData.deadline,
//       },
//     });
//     if (!res) {
//       throw new Error("Failed to fetch epics");
//     }
//     return res;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to fetch epics");
//   }
// }
export async function updateEpic(epicData: UpdateEpicData) {
  console.log(epicData);

  const body: Record<string, any> = {};

  if (epicData.title !== undefined) body.title = epicData.title;
  if (epicData.description !== undefined) body.description = epicData.description;
  if (epicData.assignee_id !== undefined) body.assignee_id = epicData.assignee_id;
  if (epicData.deadline !== undefined) body.deadline = epicData.deadline;

  try {
    const res = await apiFetch<any>(
      `/rest/v1/epics?id=eq.${epicData.id}`,
      {
        method: "PATCH",
        body,
      }
    );

    if (!res) {
      throw new Error("Failed to update epic");
    }

    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update epic");
  }
}