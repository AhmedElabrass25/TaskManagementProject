import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskModalReducer from "./slices/tasks/taskModalSlice";
import tasksReducer from "./slices/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    taskModal: taskModalReducer,
    tasks: tasksReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
