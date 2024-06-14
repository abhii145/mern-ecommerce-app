import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../api/userAPI";

export const store = configureStore({
  reducer: {
    userApi: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
