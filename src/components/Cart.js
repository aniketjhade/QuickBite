import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const CartItems = useSelector((store) => store.cart.items);
  console.log("1", CartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className=" font-bold text-2xl ">Cart</h1>
      <div className="m-auto w-6/12">
        <button
          className="bg-black text-white rounded-lg m-2 p-2"
          onClick={handleClearCart}
        >
          Clear cart
        </button>

        {CartItems.length === 0 && (
          <h1>Your Cart is Emplty!! Please add items to your cart.</h1>
        )}

        <ItemList items={CartItems} />
      </div>
    </div>
  );
};
export default Cart;
