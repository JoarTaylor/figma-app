import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSignedIn,
  selectSavedProducts,
  selectUserCart,
} from "../../store/features/user/user.selector";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  removeProductFromSaved,
  saveUserAsync,
  setSavedProducts,
} from "../../store/features/user/user.slice";
import Button from "../utils/button";
import { Link, useNavigate } from "react-router-dom";
import regularHeart from "../../assets/regularHeart.svg";
import filledHeart from "../../assets/filledHeart.svg";
import SignIn from "../../pages/SignIn";
import { useEffect, useState } from "react";
import { selectAllProducts } from "../../store/features/products/products.selector";

export default function ProductItem({ productItem, inCart }) {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const { category, id, price, quantity, title, image, discount } = productItem;
  const savedProducts = useSelector(selectSavedProducts);
  const [savedProduct, setSavedProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadySaved = savedProducts.some((product) => product.id == productItem.id);
    setSavedProduct(alreadySaved);
  }, [savedProducts]);

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(productItem));
  };

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(productItem));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(productItem));
  };

  const saveProductToProfile = (e) => {
    if (isSignedIn) {
      dispatch(setSavedProducts(productItem));
      dispatch(saveUserAsync());
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="flex flex-col  justify-between">
        <Link className="w-full" to={`/${category}/${id}`}>
          <div className="flex flex-col justify-center p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <img
              onClick={(e) => {
                e.preventDefault();
                saveProductToProfile();
              }}
              className=" sm:h8 h-6 self-end object-scale-down"
              src={savedProduct && isSignedIn ? filledHeart : regularHeart}
            ></img>
            <img
              className=" h-24 object-scale-down sm:h-80"
              src={image}
              alt=""
            />
          </div>
          <div className=" overflow-hidden text-ellipsis whitespace-nowrap sm:mt-2 sm:mr-8 ">
            {title}
          </div>
        </Link>

        <div className=" flex flex-col">
          <div className=" font-bold text-red-700 ">
            {discount && `${(Math.round(price) * (100 - discount)) / 100} $`}
          </div>
          <div
            className={
              discount ? "flex text-xs text-gray-400" : "text-[#1D2026]"
            }
          >
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
              <div className="mt-[32px] mr-[16px] flex justify-center">
                <div
                  onClick={handleDecrementQuantity}
                  className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[28px] text-[#FF7E1B]"
                >
                  -
                </div>
                <div className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[16px] font-bold">
                  {quantity ? quantity : "0"}
                </div>
                <div
                  onClick={handleIncrementQuantity}
                  className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[28px] text-[#FF7E1B]"
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
