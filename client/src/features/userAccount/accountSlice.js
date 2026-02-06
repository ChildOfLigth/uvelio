import { createSlice } from "@reduxjs/toolkit";

export const userAccountSlice = createSlice({
    name: "usersAccount",
    initialState: { accountData: {}, status: 'idle' },
    reducers: {},
    extraReducers: {}
});