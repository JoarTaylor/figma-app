import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './features/products/products.slice.jsx';
import userReducer from './features/user/user.slice.jsx'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer
    }
})