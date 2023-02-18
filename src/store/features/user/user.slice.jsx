import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    deleteFromCart: (state, {payload}) => {
        let index = state.cart.indexOf(payload);
        state.cart.splice(index+1, 1)
    }
  },
});

export const { addToCart, deleteFromCart } = userSlice.actions;

export default userSlice.reducer;
