"use server";
import { apiFetch } from "@/lib/api";
type AddTask = {
    project_id: string;
    epic_id?: string;
    title: string;
    description?: string;
    assignee_id?: string;
    due_date?: string;
    status: string;
}
export async function addTask(task: AddTask) {
    try{
    const res = await apiFetch<any>("/rest/v1/tasks", {
        method: "POST",
        body: {
            project_id: task.project_id,
            epic_id: task.epic_id,
            title: task.title,
            description: task.description,
            assignee_id: task.assignee_id,
            due_date: task.due_date,
            status: task.status
        },
    });
        return res;
    } catch (error: any) {
    throw new Error(error.message || "task creation failed");
}

}
        