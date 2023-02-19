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
        console.log(payload.id);
        state.cart.splice(state.cart.findIndex(item => item.id == payload.id), 1)
    }
  },
});

export const { addToCart, deleteFromCart } = userSlice.actions;

export default userSlice.reducer;
