import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItem(state, action) {
      const newitem = action.payload;
      const existingitem = state.items.find((item) => item.id === newitem.id);
      state.totalQuantity++;
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
      if (existingitem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingitem.quantity--;
        existingitem.totalPrice -= existingitem.price;
      }
    },
  },
});

export const sendCartData=(cart)=>{
return async(dispatch)=>{
    dispatch(
        uiActions.showNotification({
          title: "Sending....",
          message: "Sending cart data!",
          status: "pending",
        })
      );
      const sendRequest=async()=>{
        const response = await fetch(
            "https://matchr-8e94e-default-rtdb.firebaseio.com/cart.json",
            {
              method: "PUT",
              body: JSON.stringify(cart),
            }
          );
          if (!response.ok) {
            throw new Error("Something went Wrong");
          }
          //const data=await response.json();
      }
      await sendRequest().catch((e) => {
        dispatch(
          uiActions.showNotification({
            title: "Error!",
            message: "Sending cart data failed",
            status: "error",
          })
        );
      });

      dispatch(
        uiActions.showNotification({
          title: "Success!",
          message: "Cart data sent!",
          status: "success",
        })
      );
};
}

export default cartSlice;
export const cartActions = cartSlice.actions;
