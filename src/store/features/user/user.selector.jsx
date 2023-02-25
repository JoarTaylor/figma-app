import { createSelector } from "@reduxjs/toolkit";

const userSlice = (state) => state.user

export const selectUserCart = createSelector([userSlice], (userSlice) => userSlice.cart)

export const selectUserEmail = createSelector([userSlice], (userSlice) => userSlice.userEmail)

export const selectUserId = createSelector([userSlice], (userSlice) => userSlice.userId)

export const selectIsSignedIn = createSelector([userSlice], (userSlice) => userSlice.isSignedIn)

export const selectUserName = createSelector([userSlice], (userSlice) => userSlice.userName)

export const selectProfileImageSrc = createSelector([userSlice], (userSlice) => userSlice.profileImageSrc)