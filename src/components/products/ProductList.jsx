import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({products}) {
    console.log(products)
  return (
    <div>
        {products.map((product, i )=> {
          return  <ProductItem productItem={product} key={i}></ProductItem>
        })}
    </div>
  )
}
