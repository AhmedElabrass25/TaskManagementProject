"use server";

import { apiFetch } from "@/lib/api";

export async function getAllEpicsPaginated({ limit, offset,projectId }: { limit: number; offset: number, projectId: string }) {
       try {
    const res = await apiFetch<any[]>(`/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`, {
      method: "GET",
    });
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
    const res = await apiFetch<any[]>(`/rest/v1/project_epics?project_id=eq.${projectId}`, {
      method: "GET",
    });
    if (!res) {
      throw new Error("Failed to fetch epics");
    }
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch epics");
  }
}