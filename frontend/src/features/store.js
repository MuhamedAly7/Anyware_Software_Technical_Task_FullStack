import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import announcementReducer from "../features/announcements/announcementSlice";
import dueReducer from "../features/dues/dueSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcement: announcementReducer,
    due: dueReducer,
  },
});
