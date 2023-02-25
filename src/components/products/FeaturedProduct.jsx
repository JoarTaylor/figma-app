import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectAllProducts, selectFeaturedProduct } from "../../store/features/products/products.selector";
import mainpic from "../../assets/mainpic.svg";
import { setFeaturedProduct } from "../../store/features/products/products.slice";

export default function FeaturedProduct() {
  const products = useSelector(selectAllProducts);
  const { id } = useParams();
  const [figma, setFigma] = useState(false);
  const featuredProduct = useSelector(selectFeaturedProduct)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id == 22) {
      setFigma(true)
     } ;
    dispatch(setFeaturedProduct(id))
   
  });

  if (!featuredProduct) return;
  return (
    <div className="mt-[90px] flex">
      <div className="mr-[125px]">
        {!figma && (
          <img
            className="h-[445px] w-[445px] rounded-[15px] border-2 object-scale-down shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
            src={featuredProduct.image}
            alt=""
          />
        )}
        {figma && (
          <img
            className="h-[445px] w-[445px] rounded-[15px] object-scale-down"
            src={mainpic}
            alt=""
          />
        )}
      </div>
      <div className="w-[445px]">
        <div className="weight-700 font-bold tracking-[2px] text-[#FF7E1B] mb-[27px]">
          {featuredProduct.model}
        </div>
        <div className="text-[#1D2026] text-[44px] leading-[48px] mb-[32px]">{featuredProduct.title}</div>
        <div className="leading-[26px] text-[#69707D] mb-[28px]">{featuredProduct.description}</div>
        <div className="text-[#1D2026] font-bold text-[28px] leading-[35px]">${featuredProduct.price}</div>
        
      </div>
    </div>
  );
}
