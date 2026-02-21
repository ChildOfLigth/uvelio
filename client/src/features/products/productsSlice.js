import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsThunk";

export const productsSlice = createSlice({
  name: "products",
  initialState: { productsList: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.productsList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
    })
});

export default productsSlice.reducer;
