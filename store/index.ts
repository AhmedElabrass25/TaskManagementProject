import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskModalReducer from "./slices/tasks/taskModalSlice";
import tasksReducer from "./slices/tasks/taskSlice";
import calendarReducer from "./slices/calenderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    taskModal: taskModalReducer,
    tasks: tasksReducer,
    calendar: calendarReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
