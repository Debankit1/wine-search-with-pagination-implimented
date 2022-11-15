import { configureStore } from "@reduxjs/toolkit";
import wineSlice from "./slices/wineSlice";

export const store = configureStore({
  reducer: {
    wineSlice,
  },
});
