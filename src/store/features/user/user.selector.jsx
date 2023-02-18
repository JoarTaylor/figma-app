import { createSelector } from "@reduxjs/toolkit";

const userSlice = (state) => state.user

export const selectUserCart = createSelector([userSlice], (userSlice) => userSlice.cart)