import { createSlice } from "@reduxjs/toolkit";

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    isAuth: false,
    accountData: {
      userData: {
        id: "",
        name: "",
        surname: "",
        email: "",
      },
      countryCode: "USD",
      wishList: [],
      completedPurchases: [],
    },
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default userAccountSlice.reducer;
