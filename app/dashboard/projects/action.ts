"use server";

import { apiFetch } from "@/lib/api";

export type Project = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
};
export async function getAllProjects() {
  try {
    const res = await apiFetch<Project[]>("/rest/v1/rpc/get_projects", {
      method: "GET",
    });
    if (!res) {
      throw new Error("Failed to fetch projects");
    }
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch projects");
  }
}
