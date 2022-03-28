import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";

let isinit=true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  //whenever cart updates this useeffect will automatically update cart in firebase
  useEffect(() => {
   
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          title: "Sending....",
          message: "Sending cart data!",
          status: "pending",
        })
      );
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
      dispatch(
        uiActions.showNotification({
          title: "Success!",
          message: "Cart data sent!",
          status: "success",
        })
      );
    };

    if(isinit===true){
      isinit=false;
      return ;
    }
    sendCartData().catch((e) => {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Sending cart data failed",
          status: "error",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
