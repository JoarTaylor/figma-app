import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserCart } from "../store/features/user/user.selector";
import ProductItem from "../components/products/ProductItem";
import ProductList from "../components/products/ProductList";
import Button from "../components/utils/button";

export default function Cart() {
  const userCart = useSelector(selectUserCart);
  const totalCheckoutAmount = userCart.reduce((acc, val) => {
    return acc + Math.round(val.quantity * val.price);
  }, 0);

  const handleCheckout = () => {};

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <ProductList inCart={true} products={userCart} />
      <div>Total amount: $ {totalCheckoutAmount}</div>
      <Button callback={handleCheckout}>Checkout</Button>
    </div>
  );
}
