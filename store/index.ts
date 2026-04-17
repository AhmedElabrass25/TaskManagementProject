import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// types (مهم)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;