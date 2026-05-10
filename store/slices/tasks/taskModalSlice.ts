import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskModalState = {
  isOpen: boolean;
  selectedTaskId: string | null;
};

const initialState: TaskModalState = {
  isOpen: false,
  selectedTaskId: null,
};

const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    openTaskModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.selectedTaskId = action.payload;
    },
    closeTaskModal: (state) => {
      state.isOpen = false;
      state.selectedTaskId = null;
    },
  },
});

export const { openTaskModal, closeTaskModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;