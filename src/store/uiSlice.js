import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { cartIsVisible: true, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
