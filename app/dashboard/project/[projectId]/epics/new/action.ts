"use server";

import { apiFetch } from "@/lib/api";


type AddEpic = {
    title: string;
    description?: string;
    assignee_id?: string;
    project_id: string;
    deadline?: string;
}
export async function addEpic(ebic: AddEpic) {
  console.log(ebic);
    try{
    const res = await apiFetch<any>("/rest/v1/epics", {
        method: "POST",
        body: {
            title: ebic.title,
            description: ebic.description,
            assignee_id: ebic.assignee_id,
            project_id: ebic.project_id,
            deadline: ebic.deadline,
        },
    });
        console.log(res);
        return res;
    } catch (error: any) {
    throw new Error(error.message || "Ebic creation failed");
}

}
        