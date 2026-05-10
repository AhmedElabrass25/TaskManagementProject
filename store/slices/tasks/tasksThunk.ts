import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks } from "@/app/(dashboard)/project/[projectId]/tasks/action";
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (
    params: {
      projectId: string;
      status?: string;
      limit: number;
      offset: number;
      search?: string;
    },
    thunkAPI,
  ) => {
    try {
      const res = await getTasks(params);

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch tasks");
    }
  },
);
