import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { GenderContext } from "./ProductContext";

export default function ProductList({ products }) {
  const gender = useContext(GenderContext);

  return (
    <div>
      {products.map((product, i) => {
        if(product.gender == gender || gender == null)
        return <ProductItem productItem={product} key={i}></ProductItem>;
      })}
    </div>
  );
}
