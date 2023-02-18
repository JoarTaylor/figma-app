import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../../firebase";

export const getProductsAsync = createAsyncThunk(
  "getQuestionsAsync",
  async () => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  isSuccess: false,
  message: ''
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, {payload}) => {
      state.products = payload;
      state.loading = false;
      state.isSuccess = true;
    }),
    builder.addCase(getProductsAsync.pending, (state, action) => {
      state.loading = true;
      state.isSuccess = false;
    }),
    builder.addCase(getProductsAsync.rejected, (state, {payload}) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    })
  },
});

export const {
  setProducts,
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
} = productsSlice.actions;

export default productsSlice.reducer;
