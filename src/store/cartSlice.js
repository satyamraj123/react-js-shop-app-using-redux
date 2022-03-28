import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { cartIsVisible: true };

const cartSlice=createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});


export default cartSlice;
export const cartActions=cartSlice.actions;