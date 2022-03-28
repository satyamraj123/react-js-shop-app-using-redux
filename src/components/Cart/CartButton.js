import classes from "./CartButton.module.css";
import { uiActions } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalCartQuantity=useSelector((state)=>state.cart.totalQuantity);
  const togglehandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={togglehandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartQuantity}</span>
    </button>
  );
};

export default CartButton;
