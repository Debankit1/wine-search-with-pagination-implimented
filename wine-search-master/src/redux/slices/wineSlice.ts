import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wineType } from "../../utils/typeDefs";

const initialState = {
  wines: [],
};

export const wineSlice = createSlice({
  name: "Wines",
  initialState,
  reducers: {
    getWines: (state: any, action: PayloadAction<wineType[]>) => {
      state.wines = action.payload;
    },
    storeWines: (state: any, action: any) => {
      state.wines = action.payload
    },
  },
});


export const { getWines, storeWines } = wineSlice.actions;

export default wineSlice.reducer;
