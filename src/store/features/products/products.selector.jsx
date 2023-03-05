import { createSelector } from "@reduxjs/toolkit";

const productsSlice = (state) => state.products;

export const selectAllProducts = createSelector([productsSlice], (products) => 
  products.products
);

