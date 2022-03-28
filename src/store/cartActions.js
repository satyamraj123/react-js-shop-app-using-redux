import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://matchr-8e94e-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      return data;
    };

    try {
      let cartData = await fetchData();
      if(!cartData||cartData.totalQuantity===0){
          cartData={items:[],totalQuantity:0};
      }
      dispatch(cartActions.replaceCart(cartData));
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Fetching cart data failed",
          status: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Sending....",
        message: "Sending cart data!",
        status: "pending",
      })
    );
    const sendRequest = async () => {
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
    };
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
};
