import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    open: modalSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;