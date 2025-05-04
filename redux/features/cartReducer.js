import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

const cartReducer = createReducer(initialState, (builder) => {
    // Add to cart
    builder.addCase("addToCartRequest", (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
    });
    builder.addCase("addToCartSuccess", (state, action) => {
        state.loading = false;
        const item = action.payload;
        state.cartItems = state.cartItems || [];
        const existingItem = state.cartItems.find((p) => p.productId === item.productId);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            if (existingItem.quantity > 10) existingItem.quantity = 10;
            // Đảm bảo existingItem có price (nếu cần)
        } else {
            state.cartItems.push({ ...item, price: item.price }); // Đảm bảo item mới có price
        }
        state.error = null;
    });
    builder.addCase("addToCartFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });

    // Remove from cart
    builder.addCase("removeFromCart", (state, action) => {
        state.cartItems = state.cartItems.filter((p) => p.productId !== action.payload);
        state.error = null;
    });
    builder.addCase("removeFromCartFail", (state, action) => {
        state.error = action.payload;
    });

    builder.addCase("updateQuantity", (state, action) => {
        const { productId, quantity } = action.payload;
        state.cartItems = state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
        );
        state.error = null;
    });

     builder.addCase("updateQuantityFail", (state, action) => {
        state.error = action.payload;
    });

    // Clear cart
    builder.addCase("clearCart", (state) => {
        state.cartItems = [];
        state.error = null;
    });

     builder.addCase("clearCartFail", (state, action) => {
        state.error = action.payload;
    });

    builder.addCase("setCart", (state, action) => {
        state.cartItems = action.payload ? action.payload.map(item => ({
            ...item,
            price: item.price // Đảm bảo price tồn tại
        })) : [];
        state.error = null;
    });

    builder.addCase("loadCartRequest", (state) => {
        state.loading = true;
        state.error = null;
    });

    builder.addCase("loadCartSuccess", (state, action) => {
        state.loading = false;
        state.cartItems = action.payload ? action.payload.map(item => ({
            ...item,
            price: item.price // Đảm bảo price tồn tại
        })) : [];
        state.error = null;
    });
    builder.addCase("loadCartFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
});

export default cartReducer;
