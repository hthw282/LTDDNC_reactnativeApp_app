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

    // CREATE REVIEW
    builder.addCase("addProductReviewRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("addProductReviewSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.reward = action.payload.reward;
    });
    builder.addCase("addProductReviewFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET REVIEWS
    builder.addCase("getProductReviewsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getProductReviewsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalReviews = action.payload.totalReviews;
        state.reviews = action.payload.reviews;
    });
    builder.addCase("getProductReviewsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // CREATE COMMENT
    builder.addCase("addCommentRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("addCommentSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.comment = action.payload.data;
    });
    builder.addCase("addCommentFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET COMMENTS BY PRODUCT
    builder.addCase("getCommentsByProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getCommentsByProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalComments = action.payload.totalComments;
        state.comments = action.payload.comments;
    });
    builder.addCase("getCommentsByProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // DELETE COMMENT
    builder.addCase("deleteCommentRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("deleteCommentSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("deleteCommentFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET SIMILAR PRODUCTS
    builder.addCase("getSimilarProductsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getSimilarProductsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.similarProducts = action.payload.products;
    });
    builder.addCase("getSimilarProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // ADD TO VIEWED PRODUCTS
    builder.addCase("addViewedProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("addViewedProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("addViewedProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET VIEWED PRODUCTS
    builder.addCase("getViewedProductsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getViewedProductsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.viewedProducts = action.payload.viewedProducts;
    });
    builder.addCase("getViewedProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    //GET TOTAL PURCHASE
    builder.addCase("countTotalPurchasesForProductRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("countTotalPurchasesForProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalPurchases = action.payload.totalPurchases;
    });
    builder.addCase("countTotalPurchasesForProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });
});

