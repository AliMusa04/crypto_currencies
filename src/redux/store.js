import { configureStore } from "@reduxjs/toolkit";
import { favSlice } from "./slice/fav";

export const store = configureStore({
  reducer: {
    favCount: favSlice.reducer,
  },
});
