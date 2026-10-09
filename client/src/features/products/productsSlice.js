import { createSlice } from "@reduxjs/toolkit";
import {
  getLength,
  getProducts,
  additionalLoadingOfProds,
  gettingProdsForNewPage,
  searchProdsByName,
} from "./productsThunk";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    selectedProductsCategory: "rings",
    totalLengthOfList: null,
    productsList: [],
    additionalProds: [],
    currentProd: null,
    status: "idle",
    endOfProdList: false,
    selectedFilters: {},
    error: null,
  },
  reducers: {
    setSelectedProductsCategory(state, action) {
      state.selectedProductsCategory = action.payload;
    },
    setAddFilter(state, action) {
      const { key, value } = action.payload;

      if (!state.selectedFilters[key]) {
        state.selectedFilters[key] = [];
      }

      if (!state.selectedFilters[key].includes(value)) {
        state.selectedFilters[key].push(value);
      }
    },
    setRemoveFilter(state, action) {
      const { key, value } = action.payload;
      const allFilters = state.selectedFilters;

      if (!allFilters[key]) {
        return;
      }

      const updatedFilters = allFilters[key].filter(
        (filter) => filter != value,
      );

      if (updatedFilters.length === 0) {
        delete allFilters[key];
      } else {
        allFilters[key] = updatedFilters;
      }
    },
    setReplaceFilter(state, action) {
      const { key, value } = action.payload;
      state.selectedFilters[key] = [value];
    },
    setSelectedFilters(state, action) {
      state.selectedFilters = action.payload;
    },
    setClearAllFilters(state) {
      state.selectedFilters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLength.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLength.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalLengthOfList = action.payload;
        state.error = null;
      })
      .addCase(getLength.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsList = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(searchProdsByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProdsByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsList = action.payload;
      })
      .addCase(searchProdsByName.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(additionalLoadingOfProds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(additionalLoadingOfProds.fulfilled, (state, action) => {
        state.additionalProds = action.payload.prodsList;
        const { additionalProds, productsList } = state;

        if (additionalProds && additionalProds != null) {
          if (additionalProds.length != 0) {
            productsList.push(...additionalProds);
            state.status = "succeeded";
            state.error = null;
            state.endOfProdList = action.payload.endOfList;
          }
        }
      })
      .addCase(additionalLoadingOfProds.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });

    builder
      .addCase(gettingProdsForNewPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(gettingProdsForNewPage.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.productsList = [...action.payload.prodsList];
        state.endOfProdList = action.payload.endOfList;
        state.error = null;
      })
      .addCase(gettingProdsForNewPage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setSelectedProductsCategory,
  setAddFilter,
  setRemoveFilter,
  setReplaceFilter,
  setSelectedFilters,
  setClearAllFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
