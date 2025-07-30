import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
