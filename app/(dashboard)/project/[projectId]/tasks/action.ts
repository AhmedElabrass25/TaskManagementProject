import { apiFetch } from "@/lib/api";

export async function getAllTasks(projectId: string) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
      }
    return res;  
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
}
// get taks with epiId
export async function getEpicTasks(epicId: string) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_tasks?epic_id=eq.${epicId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
      }
    return res;  
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
}
// get tasks using status ### Fetch tasks by status
export async function getTasksByStatus(projectId: string, status: string) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
      }
    return res;  
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
}
export async function getSingleTask(projectId: string, taskId: string) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
      }
    return res[0];  
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
}
// ```GET /rest/v1/project_tasks?project_id=eq.{PROJECT_ID}&limit={LIMIT}&offset={OFFSET}
export async function getAllTasksPaginated(projectId: string, limit: number, offset: number) {
  try {
    const res = await apiFetch<any[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
      }
    return res;  
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch tasks");
  }
}