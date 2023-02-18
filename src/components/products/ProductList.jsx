import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { CategoryContext } from "./ProductContext";

export default function ProductList({ products }) {
  const category = useContext(CategoryContext);

  return (
    <div>
      {products.map((product, i) => {
        if(product.category == category || category == null)
        return <ProductItem productItem={product} key={i}></ProductItem>;
      })}
    </div>
  );
}
