import { apiFetch } from "@/lib/api";
import { ITask } from "@/types/types";

export async function getAllTasks({
  projectId,
  search,
}: {
  projectId: string;
  search?: string;
}) {
  try {
    const res = await apiFetch<ITask[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&${search ? `title=ilike.%25${search}%25` : ""}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch tasks");
    }
    throw new Error("Failed to fetch tasks due to an unknown error");
  }
}
// get taks with epiId
export async function getEpicTasks(epicId: string) {
  try {
    const res = await apiFetch<ITask[]>(
      `/rest/v1/project_tasks?epic_id=eq.${epicId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch tasks");
    }
    throw new Error("Failed to fetch tasks due to an unknown error");
  }
}
// get tasks using status ### Fetch tasks by status
export async function getTasksByStatus(projectId: string, status: string) {
  try {
    const res = await apiFetch<ITask[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch tasks");
    }
    throw new Error("Failed to fetch tasks due to an unknown error");
  }
}

export async function getTasksByStatusPaginated({
  projectId,
  status,
  limit,
  offset,
  search,
}: {
  projectId: string;
  status: string;
  limit: number;
  offset: number;
  search?: string;
}) {
  try {
    const searchQuery = search ? `&title=ilike.%25${search}%25` : "";
    const res = await apiFetch<ITask[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}${searchQuery}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact",
        },
        includeCount: true,
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
    }
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch tasks");
    }
    throw new Error("Failed to fetch tasks due to an unknown error");
  }
}
export async function getSingleTask(projectId: string, taskId: string) {
  try {
    const res = await apiFetch<ITask[]>(
      `/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
      {
        method: "GET",
      },
    );
    if (!res) {
      throw new Error("Failed to fetch tasks");
    }
    return res[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch tasks");
    }
    throw new Error("Failed to fetch tasks due to an unknown error");
  }
}
