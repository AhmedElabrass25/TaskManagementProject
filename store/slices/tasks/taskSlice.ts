import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "./tasksThunk";
import { ITask } from "@/types/types";

type TasksState = {
  items: ITask[];
  count: number;
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskLocally: (
      state,
      action: PayloadAction<{
        taskId: string;
        changes: Partial<ITask>;
      }>,
    ) => {
      const { taskId, changes } = action.payload;

      const task = state.items.find((t) => t.id === taskId);

      if (task) {
        Object.assign(task, changes);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.count = action.payload.count || 0;
        state.error = null;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateTaskLocally } = tasksSlice.actions;
export default tasksSlice.reducer;
