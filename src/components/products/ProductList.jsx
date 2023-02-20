import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { GenderContext } from "./ProductContext";

export default function ProductList({ products, inCart  }) {
  const gender = useContext(GenderContext);

  return (
    <div className={inCart? 'grid grid-cols-1 w-1/5 gap-8 my-10': 'grid grid-cols-4 gap-8 my-10'}>
      {products.map((product, i) => {
        if(product.gender == gender || gender == null)
        return <ProductItem inCart={inCart} productItem={product} key={product.id}></ProductItem>;
      })}
    </div>
  )
}
