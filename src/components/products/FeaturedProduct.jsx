import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  selectAllProducts,
} from "../../store/features/products/products.selector";
import mainpic from "../../assets/mainpic.svg";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../store/features/user/user.slice";
import { selectUserCart } from "../../store/features/user/user.selector";
import pic1 from "../../assets/pic4.svg";
import pic2 from "../../assets/pic2.svg";
import pic3 from "../../assets/pic3.svg";
import pic4 from "../../assets/pic4.svg";

const picArray = [
  pic1, pic2, pic3, pic4
];

export default function FeaturedProduct() {
  const cart = useSelector(selectUserCart);
  const products = useSelector(selectAllProducts)
  const { id } = useParams();
  const [figma, setFigma] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState()
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [currentPic, setCurrentPic] = useState('')

  useEffect(() => {
    if (id == 22) {
      setFigma(true);
    }
    const featured = products.find(product => product.id == id)
    setFeaturedProduct(featured)
    const currentProduct = cart.find((product) => product.id == id);
    if(currentProduct) {
    setQuantity(currentProduct.quantity);
    } else {
      setQuantity(0)
    }
  },[products, cart]);

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(featuredProduct));
  };

  const handleDecrementQuantity = () => {
    if(quantity == 0) return;
    dispatch(decrementQuantity(featuredProduct));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(featuredProduct));
  };

  const handleSetCurrentPic = (pic) => {
    if(pic == pic1) {
      setCurrentPic(mainpic)
    } else {
    setCurrentPic(pic)
    }
  }


  if (!featuredProduct) return;
  return (
    <div className="mt-[90px] flex">
      <div className="mr-[125px] flex flex-col">
        {!figma && (
          <img
            className="h-[445px] w-[445px] rounded-[15px] border-2 object-scale-down"
            src={featuredProduct.image}
            alt=""
          />
        )}
        {figma && (
          <img
            className="h-[445px] w-[445px] rounded-[15px] object-scale-down"
            src={currentPic ? currentPic : mainpic}
            alt=""
          />
        )}

        <div className="flex gap-[31px] mt-[32px] mb-[132px]">{
          picArray.map((pic,i) => {
            return <img className=" cursor-pointer hover:opacity-50 hover:border-red-600" onClick={() => {handleSetCurrentPic(pic)}} key={i} src={pic}></img>
          })
          }
        </div>
      </div>




      <div className="w-[445px]">
        <div className="weight-700 mb-[27px] font-bold tracking-[2px] text-[#FF7E1B]">
          {featuredProduct.model}
        </div>
        <div className="mb-[32px] text-[44px] leading-[48px] font-extrabold text-[#1D2026]">
          {featuredProduct.title}
        </div>
        <div className="mb-[28px] leading-[26px] text-[#69707D]">
          {featuredProduct.description}
        </div>
        <div className="flex">
          <div className="text-[28px] font-bold leading-[35px] text-[#1D2026]">
            ${featuredProduct.price}
          </div>
          <div className="ml-[23px] items-center self-center rounded-lg bg-[#FFEEE2] p-1 font-bold text-[#FF7E1B]">
            {featuredProduct?.discount && `${featuredProduct.discount}%`}
          </div>
        </div>
        {featuredProduct?.discount && (
          <div className="font-bold text-[#B6BCC8]">
            $
            {(Math.round(featuredProduct.price) *
              (100 - featuredProduct.discount)) /
              100}
          </div>
        )}
        <div className="mt-[32px] mr-[16px] flex">
          <div
            onClick={handleDecrementQuantity}
            className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[28px] text-[#FF7E1B]"
          >
            -
          </div>
          <div className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[16px] font-bold">
            {quantity? quantity : '0'}
          </div>
          <div
            onClick={handleIncrementQuantity}
            className="flex h-[56px] w-[52px] cursor-pointer items-center justify-center bg-[#F6F8FD] text-[28px] text-[#FF7E1B]"
          >
            +
          </div>
          <div
            onClick={handleAddToCart}
            className="ml-[16px] flex h-[56px] w-[272px] cursor-pointer items-center justify-center rounded-[10px] bg-[#FF7E1B] text-[16px] font-bold text-white hover:bg-[#FFAB6A]"
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}
