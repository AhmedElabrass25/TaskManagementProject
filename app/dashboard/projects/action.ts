"use server";

import { apiFetch } from "@/lib/api";
import { Project } from "@/types/types";


export async function getAllProjectsPaginated({ limit, offset }: { limit: number; offset: number }) {
  try {
    const res = await apiFetch<Project[]>(`/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`, {
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
export async function getAllProjects() {
  try {
    const res = await apiFetch<Project[]>(`/rest/v1/rpc/get_projects`, {
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