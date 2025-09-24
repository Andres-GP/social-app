import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import userSlice from "./slices/userSlice";
import loadingSlice from "./slices/loadingSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    loading: loadingSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
