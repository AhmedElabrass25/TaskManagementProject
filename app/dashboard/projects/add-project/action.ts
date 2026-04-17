"use server";

import { apiFetch } from "@/lib/api";

type addProject = {
    name: string;
    description?: string;
}
export async function addProject(project: addProject) {
  console.log(project);
    try{
    const res = await apiFetch<any>("/rest/v1/projects", {
        method: "POST",
        body: {
            name: project.name,
            description: project.description,
        },
    });
        return res;
    } catch (error: any) {
    throw new Error(error.message || "Project creation failed");
}

}
        