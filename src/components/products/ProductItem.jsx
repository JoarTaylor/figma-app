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

  const { category, id, price, quantity, title, image, discount } = productItem;

  return (
    <>
      <div className="flex flex-col  justify-between">
        <Link className="w-full" to={`/${category}/${id}`}>
          <div className="flex justify-center p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <img className=" h-96 object-scale-down" src={image} alt="" />
          </div>
          <div className=" mt-2 mr-8 overflow-hidden text-ellipsis whitespace-nowrap ">
            {title}
          </div>
        </Link>

        <div className=" flex flex-col">
          <div className=" font-bold text-red-700 ">
            {discount && `${(Math.round(price) * (100 - discount)) / 100} $`}
          </div>
          <div className={discount ? "flex text-gray-400 text-xs" : "text-[#1D2026]"}>
            {discount ? "Originally: " : ""}
            <div className={discount ? "line-through decoration-gray-500" : ""}>
              {price} $
            </div>
            <div className="flex items-center text-xs font-bold text-[#FF7E1B]">
              {discount && `-${discount}%`}
            </div>
          </div>
        </div>

        {inCart && (
          <>
            <div>${Math.round(price * quantity)}</div>
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between">
                <div
                  className=" h-10 w-10 cursor-pointer rounded-lg bg-blue-400 text-center text-3xl font-bold text-white"
                  onClick={handleDecrementQuantity}
                >
                  -
                </div>
                <div>{productItem.quantity}</div>
                <div
                  className="h-10 w-10 cursor-pointer place-items-center rounded-lg bg-blue-400 text-center text-3xl text-white"
                  onClick={handleIncrementQuantity}
                >
                  +
                </div>
              </div>
              <button
                className="hover: m-3 rounded-lg border-2 p-2 "
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
