"use server";
import { apiFetch } from "@/lib/api";
import { ITaskCalendarStatsResponse } from "@/types/types";
interface ITaskCalender {
  p_start_date: string | null;
  p_end_date: string | null;
  p_project_id: string | null;
  p_status: string | null;
}

export async function getTaskCalender(data: ITaskCalender) {
  console.log(data);
  try {
    const res = await apiFetch<ITaskCalendarStatsResponse>(
      `/rest/v1/rpc/get_tasks_calendar_stats`,
      {
        method: "POST",
        body: data,
      },
    );
    if (!res) {
      throw new Error("Failed to fetch task calender");
    }
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get task calender");
  }
}
