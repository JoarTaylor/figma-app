import { useDispatch, useSelector } from "react-redux";
import { selectUserCart } from "../../store/features/user/user.selector";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../store/features/user/user.slice";
import Button from "../utils/button";
import { Link } from "react-router-dom";

export default function ProductItem({ productItem, inCart }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectUserCart);

  const handleAddToCart = () => {
    dispatch(addToCart(productItem));
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(productItem));
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(productItem));
    console.log(cart);
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(productItem));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <Link to={`/collections/${productItem.id}`}>
          <img
            className="h-40 w-96  object-scale-down"
            src={productItem.image}
            alt=""
          />
          <div className="text-center font-bold">{productItem.title}</div>
        </Link>
        <div className=" h-20 overflow-hidden text-xs">
          {productItem.description}
        </div>

        {!inCart && (
          <div className="mt-auto flex flex-col items-center">
            <div>${Math.round(productItem.price)}</div>{" "}
            <Button callback={handleAddToCart}>Add</Button>
          </div>
        )}

        {inCart && (
          <>
            <div>${Math.round(productItem.price * productItem.quantity)}</div>
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between">
                <div
                  className=" h-10 w-10 rounded-lg bg-blue-400 text-center text-3xl font-bold text-white"
                  onClick={handleDecrementQuantity}
                >
                  -
                </div>
                <div>{productItem.quantity}</div>
                <div
                  className="h-10 w-10 place-items-center rounded-lg bg-blue-400 text-center text-3xl text-white"
                  onClick={handleIncrementQuantity}
                >
                  +
                </div>
              </div>
              <button
                className="hover: m-3 rounded-lg border-2 p-2"
                onClick={handleDeleteFromCart}
              >
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
