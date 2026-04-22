"use server";

import { apiFetch } from "@/lib/api";
import { id } from "zod/locales";

type Project = {
    id?:string
    name: string;
    description?: string;
}
export async function updateProject(project: Project) {
  console.log(project);
    try{
    const res = await apiFetch<any>(`/rest/v1/projects?id=eq.${project.id}`, {
        method: "PATCH",
        body: {
            name: project.name,
            description: project.description,
        },
    });
        console.log(res);
        return res;
    } catch (error: any) {
    throw new Error(error.message || "Project updated failed");
}

}
export async function getSingleProject(projectId: string) {
  console.log(projectId);
    try{
    const res = await apiFetch<any>(`/rest/v1/projects?id=eq.${projectId}`, {
        method: "GET",
    });
        return res[0];
    } catch (error: any) {
    throw new Error(error.message || "failed to fetch project details");
}

}
        