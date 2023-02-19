import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const itemInCart = state.cart.find((item) => item.id === payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      item.quantity++;
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    deleteFromCart: (state, { payload }) => {
      console.log(payload.id);
      state.cart.splice(
        state.cart.findIndex((item) => item.id == payload.id),
        1
      );
    },
  },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = userSlice.actions;

export default userSlice.reducer;
