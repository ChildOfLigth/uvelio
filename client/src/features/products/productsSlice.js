import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsThunk";

export const productsSlice = createSlice({
    name: "products",
    initialState: { products: [], status: 'idle' },
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = 'loading';
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.products = action.payload;
        }
    }
});