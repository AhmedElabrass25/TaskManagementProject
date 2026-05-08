"use server";

import { apiFetch } from "@/lib/api";

type Project = {
  id?: string;
  name: string;
  description?: string;
};
export async function updateProject(project: Project) {
  try {
    const res = await apiFetch<Project>(`/rest/v1/projects?id=eq.${project.id}`, {
      method: "PATCH",
      body: {
        name: project.name,
        description: project.description,
      },
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Project update failed");
    }
    throw new Error("Project update failed due to an unknown error");
  }
}
export async function getSingleProject(projectId: string) {
  try {
    const res = await apiFetch<Project[]>(`/rest/v1/projects?id=eq.${projectId}`, {
      method: "GET",
    });
    return res[0] ;
  } catch (error: unknown) {
       if (error instanceof Error) {
      throw new Error(error.message || "failed to fetch project details");
    }
      throw new Error("failed to fetch project details due to an unknown error");
  }
}
