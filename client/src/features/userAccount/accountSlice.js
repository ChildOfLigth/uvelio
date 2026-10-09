import { createSlice } from "@reduxjs/toolkit";
import {
  registrationUser,
  loginUser,
  checkAuthStatus,
  addProductToWishList,
  removeProductFromWishList,
  addProductToPurchasedGoods,
} from "./accountThunk.js";

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    accountData: {
      userData: null,
      isAuth: false,
      accessToken: null,
    },
    status: "idle",
  },
  reducers: {
    setAuthCheck(state, action) {
      state.accountData.isAuth = action.payload;
    },
    setUser(state, action) {
      state.accountData.userData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registrationUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.userData = action.payload;
      })
      .addCase(registrationUser.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.isAuth = action.payload.authStatus;

        if (action.payload.authStatus == true) {
          state.accountData.userData = action.payload.userData;
        };
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(addProductToWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.userData.wishList = action.payload;
      })
      .addCase(addProductToWishList.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(removeProductFromWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.userData.wishList = action.payload;
      })
      .addCase(removeProductFromWishList.rejected, (state) => {
        state.status = "rejected";
      });

    builder
      .addCase(addProductToPurchasedGoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToPurchasedGoods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accountData.userData.purchasedGoods = action.payload;
      })
      .addCase(addProductToPurchasedGoods.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { setAuthCheck, setUser } = userAccountSlice.actions;
export default userAccountSlice.reducer;
