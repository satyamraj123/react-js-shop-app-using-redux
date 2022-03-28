import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { cartIsVisible: true };

const uiSlice=createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});


export default uiSlice;
export const uiActions=uiSlice.actions;