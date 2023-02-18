import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../store/features/products/products.slice";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../store/features/products/products.selector";
import Spinner from "../utils/Spinner";
import ProductList from "./ProductList";

export default function Products({ productData }) {
  const dispatch = useDispatch();
  /*   const products = useSelector(selectAllProducts); */

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const isSuccess = useSelector((state) => state.products.isSuccess);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  useEffect(() => {
    console.log(products, "loading: ", loading, "isSucces: ", isSuccess);
  }, [products]);

  return (
    <>
      <div>{loading && <Spinner/>}</div>
      <div>{isSuccess && <ProductList products={products}/>}</div>
    </>
  );
}
