import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API } from "../../globalVariables";

const returnErrorMessage = (err) => {
  return err.name + ": " + err.message;
};

const getLength = createAsyncThunk(
  "products/getProdsListLength",
  async (selectedFilters, { getState, rejectWithValue }) => {
    const { selectedProductsCategory } = getState().products;
    const filterJsonStr = JSON.stringify(selectedFilters);

    try {
      const res = await BASE_API.get("/products/get-length", {
        params: {
          selectedProductsCategory,
          selectedFilters: filterJsonStr,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(returnErrorMessage(err));
    }
  },
);

const getProducts = createAsyncThunk(
  "products/getData",
  async (
    { neededCategory, selectedFilters } = {},
    { getState, rejectWithValue },
  ) => {
    const { selectedProductsCategory } = getState().products;

    const paramsAxios = {
      selectedProductsCategory:
        neededCategory != undefined ? neededCategory : selectedProductsCategory,
    };

    if (selectedFilters != undefined) {
      paramsAxios.selectedFilters = JSON.stringify(selectedFilters);
    }

    try {
      const res = await BASE_API.get("/products/get-products", {
        params: paramsAxios,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(returnErrorMessage(err));
    }
  },
);

const searchProdsByName = createAsyncThunk(
  "products/search-prods-by-name",
  async (value, { rejectWithValue, getState }) => {
    const { selectedProductsCategory } = getState((state) => state.products);
    try {
      const res = await BASE_API.get("/products/search-prods-by-name", {
        params: {
          category: selectedProductsCategory,
          value,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(returnErrorMessage(err));
    }
  },
);

const additionalLoadingOfProds = createAsyncThunk(
  "products/additional-loading-of-prods",
  async (totalNumOfProds, { getState, rejectWithValue }) => {
    const { selectedProductsCategory, selectedFilters } = getState().products;
    const filterJsonStr = JSON.stringify(selectedFilters);

    try {
      const res = await BASE_API.get("/products/additional-loading-of-prods", {
        params: {
          selectedProductsCategory,
          selectedFilters: filterJsonStr,
          totalNumOfProds,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(returnErrorMessage(err));
    }
  },
);

const gettingProdsForNewPage = createAsyncThunk(
  "products/getting-prods-for-new-page",
  async (totalNumOfProds, { getState, rejectWithValue }) => {
    const { selectedProductsCategory, selectedFilters } = getState().products;
    const filterJsonStr = JSON.stringify(selectedFilters);

    try {
      const res = await BASE_API.get("/products/getting-prods-for-new-page", {
        params: {
          selectedProductsCategory,
          selectedFilters: filterJsonStr,
          totalNumOfProds,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(returnErrorMessage(err));
    }
  },
);

export {
  getLength,
  getProducts,
  searchProdsByName,
  additionalLoadingOfProds,
  gettingProdsForNewPage,
};
