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
    });
    builder.addCase("addToCartSuccess", (state, action) => {
        state.loading = false;
        const item = action.payload;

        // Kiểm tra cartItems có tồn tại không, nếu không thì gán giá trị mặc định []
        state.cartItems = state.cartItems || [];

        const existingItem = state.cartItems.find((p) => p.productId === item.productId);

        if (existingItem) {
            existingItem.quantity += item.quantity;
            if (existingItem.quantity > 10) existingItem.quantity = 10;
        } else {
            state.cartItems.push(item);
        }
    });
    builder.addCase("addToCartFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });

    // Remove from cart
    builder.addCase("removeFromCart", (state, action) => {
        state.cartItems = state.cartItems.filter((p) => p.productId !== action.payload);
    });

    builder.addCase("updateQuantity", (state, action) => {
        const { productId, quantity } = action.payload;
        state.cartItems = state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      });
    // Clear cart
    builder.addCase("clearCart", (state) => {
        state.cartItems = [];
    });
});

export default cartReducer;
