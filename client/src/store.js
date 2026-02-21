import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './features/products/productsSlice';
import userAccountSlice from './features/userAccount/accountSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        userAccount: userAccountSlice
    },
});