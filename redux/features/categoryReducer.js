import { createReducer } from "@reduxjs/toolkit";

const initialState = {

  };

export const categoryReducer = createReducer(initialState, (builder) => {
    // CREATE CATEGORY
    builder.addCase("createCategoryRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("createCategorySuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("createCategoryFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET ALL PRODUCTS
    builder.addCase("getAllCategoriesRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getAllCategoriesSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalCat = action.payload.totalCat;
        state.categories = action.payload.categories;
    });
    builder.addCase("getAllCategoriesFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // DELETE CATEGORY   
    builder.addCase("deleteCategoryRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("deleteCategorySuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("deleteCategoryFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });  

    // UPDATE CATEGORY
    builder.addCase("updateCategoryRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("updateCategorySuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("updateCategoryFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });
});
