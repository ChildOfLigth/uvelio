import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API } from "../../globalVariables";
import { setUser, setAuthCheck } from "./accountSlice";

const registrationUser = createAsyncThunk(
  "userAccount/registration",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await BASE_API.post("/userAccount/registration", formData);

      dispatch(setUser(res.data));
      dispatch(setAuthCheck(true));

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const loginUser = createAsyncThunk(
  "userAccount/login",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await BASE_API.post("/userAccount/login", formData);

      dispatch(setUser(res.data));
      dispatch(setAuthCheck(true));

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const checkAuthStatus = createAsyncThunk(
  "userAccount/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BASE_API.get("/userAccount/check-auth-status", {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue({
        code: err.response.data.code,
        message: err.response.data.message,
      });
    }
  },
);

const updateToken = createAsyncThunk(
  "userAccount/updateToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BASE_API.post(
        "/userAccount/update-token",
        {},
        { withCredentials: true },
      );

      return res.data;
    } catch (err) {
      return rejectWithValue({
        code: err.response?.status,
        message: err.message,
      });
    }
  },
);

const addProductToWishList = createAsyncThunk(
  "userAccount/addToWishList",
  async (idProduct, { getState, rejectWithValue }) => {
    const isAuth = getState().userAccount.accountData.isAuth;
    const userId = getState().userAccount.accountData.userData.id;

    if (!isAuth) {
      rejectWithValue("User is not authorized");
    }

    try {
      const res = await BASE_API.post("/userAccount/add-product-to-wishlist", {
        productId: idProduct,
        userId,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const removeProductFromWishList = createAsyncThunk(
  "userAccount/removeFromWishList",
  async (productId, { getState }) => {
    const isAuth = getState().userAccount.accountData.isAuth;
    const userId = getState().userAccount.accountData.userData.id;
    if (!isAuth) {
      rejectWithValue("User is not authorized");
    }

    try {
      const res = await BASE_API.post(
        "/userAccount/remove-product-from-wishlist",
        {
          productId,
          userId,
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const addProductToPurchasedGoods = createAsyncThunk(
  "userAccount/addToPurchasedGoods",
  async (productId, { getState, rejectWithValue }) => {
    const isAuth = getState().userAccount.accountData.isAuth;
    const userId = getState().userAccount.accountData.userData.id;

    if (!isAuth) {
      rejectWithValue("User is not authorized.");
    }

    try {
      const res = await BASE_API.post(
        "/userAccount/add-product-from-purchaseds",
        {
          productId,
          userId,
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export {
  registrationUser,
  loginUser,
  updateToken,
  checkAuthStatus,
  addProductToWishList,
  removeProductFromWishList,
  addProductToPurchasedGoods,
};
