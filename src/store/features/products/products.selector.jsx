import { createSelector } from "@reduxjs/toolkit";

const productsSlice = (state) => state.products;

export const selectAllProducts = createSelector([productsSlice], (products1) => 
  products1.products
);


/* import { createSelector } from "@reduxjs/toolkit";

const userSlice = (state) => state.user

export const selectUserCart = createSelector([userSlice], (userSlice) => userSlice.cart) */