import React from "react";
import { useSelector } from "react-redux";
import Products from "../components/products/Products";
import { selectAllProducts } from "../store/features/products/products.selector";

export default function Collections() {

  return (

    <>
      <Products></Products>
    </>
  );
}
