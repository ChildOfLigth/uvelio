import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    'products/getData', 
    async function() {
        try {
            const res = await fetch("http://localhost/products");
            const objectProducts = res.json();

            return objectProducts;

        } catch (e) {
            return e.message;
        };
    }
);