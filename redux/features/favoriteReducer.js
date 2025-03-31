import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
    error: null,
};

export const favoriteReducer = createReducer(initialState, (builder) => {
    // ADD TO FAVORITE
    builder.addCase("addToFavoriteRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("addToFavoriteSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.favorite = action.payload.favorite;
    });
    builder.addCase("addToFavoriteFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    // REMOVE FROM FAVORITE
    builder.addCase("removeFromFavoriteRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("removeFromFavoriteSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("removeFromFavoriteFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    // GET USER FAVORITES
    builder.addCase("getUserFavoritesRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getUserFavoritesSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalFavoriteProducts = action.payload.totalFavoriteProducts;
        state.favoriteProducts = action.payload.favoriteProducts;
    });
    builder.addCase("getUserFavoritesFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });
});
