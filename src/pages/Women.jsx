import React from 'react'
import { GenderContext } from '../components/products/ProductContext'
import Products from '../components/products/Products'

export default function Women() {
  return (
    <GenderContext.Provider value='women'>
    <Products/>
    </GenderContext.Provider>
  )
}
