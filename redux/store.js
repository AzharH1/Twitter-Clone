import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./modalSlice"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    open: modalSlice,
    user: userSlice
  },
})