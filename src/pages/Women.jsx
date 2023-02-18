import React from 'react'
import { CategoryContext } from '../components/products/ProductContext'
import Products from '../components/products/Products'

export default function Women() {
  return (
    <CategoryContext.Provider value='women'>
    <Products/>
    </CategoryContext.Provider>
  )
}
