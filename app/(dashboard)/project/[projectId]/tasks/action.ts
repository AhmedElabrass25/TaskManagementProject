import { apiFetch } from "@/lib/api";
import { ITask } from "@/types/types";
type UTask = {
  title?: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  epic_id?: string;
  status?:
    | "TO_DO"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "IN_REVIEW"
    | "READY_FOR_QA"
    | "REOPENED"
    | "READY_FOR_PRODUCTION"
    | "DONE";
};
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

export async function getTasks({
  projectId,
  status,
  limit,
  offset,
  search,
}: {
  projectId: string;
  status?: string;
  limit: number;
  offset: number;
  search?: string;
}) {
  const searchQuery = search ? `&title=ilike.%25${search}%25` : "";

  const statusQuery = status ? `&status=eq.${status}` : "";

  const res = await apiFetch<ITask[]>(
    `/rest/v1/project_tasks?project_id=eq.${projectId}${statusQuery}${searchQuery}&limit=${limit}&offset=${offset}&order=created_at.asc`,
    {
      method: "GET",
      headers: {
        Prefer: "count=exact",
      },
      includeCount: true,
    },
  );

  return res;
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

export async function updateTask(taskId: string, data: UTask) {
  await apiFetch<void>(`/rest/v1/tasks?id=eq.${taskId}`, {
    method: "PATCH",
    body: data,
  });
}
