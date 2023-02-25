import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../../firebase";

export const getProductsAsync = createAsyncThunk(
  "getProductsAsync",
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
  featuredProduct: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFeaturedProduct: (state, {payload}) => {
      const featured = state.products.find(product => product.id == payload)
      state.featuredProduct = featured
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, {payload}) => {
      state.products = payload;
      state.loading = false;
      state.isSuccess = true;
    }),
    builder.addCase(getProductsAsync.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    }),
    builder.addCase(getProductsAsync.rejected, (state) => {
      state.loading = false;
      state.isSuccess = false;
    })
  },
});

export const {
  setProducts,
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  setFeaturedProduct
} = productsSlice.actions;

export default productsSlice.reducer;
