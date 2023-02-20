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
        <Link to={`/${productItem.category}/${productItem.id}`}>
          <div className="m-6 p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
              className="h-40 w-96  object-scale-down "
              src={productItem.image}
              alt=""
            />
          </div>
          <div className="text-center font-bold">{productItem.title}</div>
        </Link>
        <div className=" h-20 overflow-hidden text-xs">
          {productItem.description}
        </div>

        
          <div className="mt-auto flex flex-col items-center">
            <div className="flex">
              <div className="p-1 text-lg font-bold text-[#1D2026]">
                {productItem.discount &&
                  `${
                    (Math.round(productItem.price) *
                      (100 - productItem.discount)) /
                    100
                  } $`}
              </div>
              <div className="font-bold text-red-700">
                {productItem.discount && `${productItem.discount}%`}
              </div>
            </div>
            <div className={
                  productItem.discount ? "text-gray-400" : "text-[#1D2026]"
                }>
              <div
                className={
                  productItem.discount ? "line-through decoration-gray-500" : ""
                }
              >
                {productItem.price}
              </div>
            </div>
            {!inCart &&
            <Button callback={handleAddToCart}>Add</Button>}
          </div>
        

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
