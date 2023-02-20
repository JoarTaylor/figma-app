import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectAllProducts } from "../../store/features/products/products.selector";
import mainpic from "../../assets/mainpic.svg";

export default function FeaturedProduct() {
  const products = useSelector(selectAllProducts);
  const { id } = useParams();
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [figma, setFigma] = useState(false);

  console.log(id);

  useEffect(() => {
    setFeaturedProduct(products.find((item) => item.id == id));
    if (id == 22) setFigma(true);
  });

  console.log(featuredProduct);
  if (!featuredProduct) return;
  return (
    <div className="flex">
      <div>
        {!figma && (
          <img
            className="h-[445px] w-[445px] object-scale-down rounded-[15px] border-2"
            src={featuredProduct.image}
            alt=""
          />
        )}
        {figma && (
          <img
            className="h-[445px] w-[445px] object-scale-down rounded-[15px]"
            src={mainpic}
            alt=""
          />
        )}
      </div>
      <div>
        <div className="weight-700 text-[#FF7E1B] font-bold">{featuredProduct.model}</div>
      </div>
    </div>
  );
}
