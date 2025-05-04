import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false,
    banners: [],
    totalBanners: 0,
    message: null,
};

export const bannerReducer = createReducer(initialState, (builder) => {
    // CREATE BANNER
    builder.addCase("createBannerRequest", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
    });
    builder.addCase("createBannerSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("createBannerFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    });

    // GET ALL BANNERS
    builder.addCase("getAllBannersRequest", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.banners = [];
        state.totalBanners = 0;
    });
    builder.addCase("getAllBannersSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalBanners = action.payload.totalBanners;
        state.banners = action.payload.banners;
    });
    builder.addCase("getAllBannersFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.banners = [];
        state.totalBanners = 0;
    });

    // DELETE BANNER
    builder.addCase("deleteBannerRequest", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
    });
    builder.addCase("deleteBannerSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // Có thể lọc và cập nhật state.banners nếu cần hiển thị thay đổi ngay lập tức
    });
    builder.addCase("deleteBannerFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    });

    // UPDATE BANNER
    builder.addCase("updateBannerRequest", (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
    });
    builder.addCase("updateBannerSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // Có thể cập nhật state.banners nếu cần hiển thị thay đổi ngay lập tức
    });
    builder.addCase("updateBannerFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    });
});