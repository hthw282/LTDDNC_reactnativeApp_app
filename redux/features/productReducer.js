import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    totalProducts: 0,
    products: [],
    topProducts: [],
    error: null,
    loading: false
  };

export const productReducer = createReducer(initialState, (builder) => {
    // GET ALL PRODUCTS
    builder.addCase("getAllProductsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getAllProductsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalProducts = action.payload.totalProducts;
        state.products = action.payload.products;
    });
    builder.addCase("getAllProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.data.message
    });

    // GET TOP PRODUCTS
    builder.addCase("getTopProductsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getTopProductsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.topProducts = action.payload.products;
    });
    builder.addCase("getTopProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET SINGLE PRODUCT
    builder.addCase("getSingleProductsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getSingleProductsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.product = action.payload.product;
    });
    builder.addCase("getSingleProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // CREATE PRODUCT
    builder.addCase("createProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("createProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("createProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // UPDATE PRODUCT
    builder.addCase("updateProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("updateProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("updateProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // UPDATE PRODUCT IMAGE
    builder.addCase("updateProductImageRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("updateProductImageSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("updateProductImageFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // DELETE PRODUCT IMAGE
    builder.addCase("deleteProductImageRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("deleteProductImageSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("deleteProductImageFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });   
    
    // DELETE PRODUCT 
    builder.addCase("deleteProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("deleteProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("deleteProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });   
});
