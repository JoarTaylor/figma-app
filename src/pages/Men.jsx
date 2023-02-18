import React from 'react'
import Products from '../components/products/Products'
import { CategoryContext } from '../components/products/ProductContext'

export default function Men() {
  return (
    <CategoryContext.Provider value='men'>
    <Products/>
    </CategoryContext.Provider>
  )
}
