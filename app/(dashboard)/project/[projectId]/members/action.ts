"use server";
import { apiFetch } from "@/lib/api";


export async function getMembers(projectId: string) {
    try{
    const res = await apiFetch<any>(`/rest/v1/get_project_members?project_id=eq.${projectId}`, {
        method: "GET",
     
    });
        return res;
    } catch (error: any) {
    throw new Error(error.message || "Get Membersfailed");
}

}
        