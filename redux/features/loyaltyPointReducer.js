import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
    error: null,
    userPoints: null,
};

export const loyaltyReducer = createReducer(initialState, (builder) => {
    // CREATE VOUCHER
    builder.addCase("addLoyaltyPointsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("addLoyaltyPointsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userPoints = action.payload.data;
    });
    builder.addCase("addLoyaltyPointsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    //GET USER POINTS
    builder.addCase("getUserPointsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getUserPointsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userPoints = action.payload.data;
    });
    builder.addCase("getUserPointsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });
});
