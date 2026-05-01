import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskModalReducer from "./slices/taskModalSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
        taskModal: taskModalReducer,

  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;