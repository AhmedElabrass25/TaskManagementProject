"use server";

import { apiFetch } from "@/lib/api";
import { IEpicData } from "@/types/types";
import { title } from "process";
export type UpdateEpicData = {
  title?: string;
  description?: string;
  assignee_id?: string | null;
  deadline?: string | null;
};
export async function getAllEpicsPaginated({
  limit,
  offset,
  projectId,
  search=""
}: {
  limit: number;
  offset: number;
  projectId: string;
  search?:string
}) {
  try {
      const searchQuery = search
      ? `&title=ilike.%25${search}%25`
      : "";

    const res = await apiFetch<IEpicData[]>(
      `/rest/v1/project_epics?project_id=eq.${projectId}${searchQuery}&order=created_at.asc&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch epics");
    }
    return res;
  } catch (error: unknown) {
    if(error instanceof Error){
      throw new Error(error.message || "Failed to fetch epics");
    }
    throw new Error("Failed to fetch epics due to an unknown error");
  }
}
export async function getAllEpics(projectId: string) {
  try {
    const res = await apiFetch<IEpicData[]>(
      `/rest/v1/project_epics?project_id=eq.${projectId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch epics");
    }
    return res;
  } catch (error: unknown) {
    if(error instanceof Error){
      throw new Error(error.message || "Failed to fetch epics");  
    }
    throw new Error("Failed to fetch epics due to an unknown error");
  }
}
export async function updateEpic(epicId: string, data: UpdateEpicData) {
    await apiFetch<void>(
      `/rest/v1/epics?id=eq.${epicId}`,
      {
        method: "PATCH",
        body: data,
      }
    );
  
}