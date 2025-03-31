import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false
};

export const voucherReducer = createReducer(initialState, (builder) => {
    // CREATE VOUCHER
    builder.addCase("createVoucherRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("createVoucherSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("createVoucherFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    // GET ALL VOUCHERS
    builder.addCase("getAllVouchersRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getAllVouchersSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalVouchers = action.payload.totalVouchers
        state.vouchers = action.payload.vouchers;
    });
    builder.addCase("getAllVouchersFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    // DELETE VOUCHER
    builder.addCase("deleteVoucherRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("deleteVoucherSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("deleteVoucherFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });
});