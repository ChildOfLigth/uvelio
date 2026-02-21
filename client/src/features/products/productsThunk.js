import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getData",
  async function () {
    try {
      const objectProducts = await axios.get("http://localhost:3000/products");

      return objectProducts.data;
    } catch (e) {
      return e.message;
    }
  },
);
