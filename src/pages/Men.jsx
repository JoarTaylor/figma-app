import React from 'react'
import Products from '../components/products/Products'
import { GenderContext } from '../components/products/ProductContext'

export default function Men() {
  return (
    <GenderContext.Provider value='men'>
    <Products/>
    </GenderContext.Provider>
  )
}
