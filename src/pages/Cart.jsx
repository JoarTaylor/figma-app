import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUserCart } from '../store/features/user/user.selector'
import ProductItem from '../components/products/ProductItem';
import ProductList from '../components/products/ProductList';

export default function Cart() {
  const userCart = useSelector(selectUserCart);

  return (
   <ProductList inCart={true} products={userCart}/>
  )
}
