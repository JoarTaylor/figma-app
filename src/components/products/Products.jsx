import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/features/products/products.selector";
import ProductList from "./ProductList";
import Spinner from "../spinner/spinner.component";

export default function Products({ productData }) {

  const products = useSelector(selectAllProducts);
  const loading = useSelector((state) => state.products.loading);
  const isSuccess = useSelector((state) => state.products.isSuccess);

  return (
    <>
      {loading && <Spinner/>}
      {isSuccess && <ProductList inCart={false} products={products}/>}
    </>
  );
}
