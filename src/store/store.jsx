import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './features/products/products.slice.jsx';

export const store = configureStore({
    reducer: {
        products: productsReducer
    }
})