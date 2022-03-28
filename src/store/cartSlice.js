import { createSlice } from "@reduxjs/toolkit";
const cartInitialState = { items: [], totalQuantity: 0,changed:false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItem(state, action) {
      const newitem = action.payload;
      const existingitem = state.items.find((item) => item.id === newitem.id);
      state.totalQuantity++;
      state.changed=true;
      if (!existingitem) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name: newitem.title,
        });
      } else {
        existingitem.quantity++;
        existingitem.totalPrice += newitem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingitem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed=true;
      if (existingitem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingitem.quantity--;
        existingitem.totalPrice -= existingitem.price;
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
