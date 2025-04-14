import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  };

export const orderReducer = createReducer(initialState, (builder) => {
    // CREATE ORDER
    builder.addCase("createOrderRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("createOrderSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    });
    builder.addCase("createOrderFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET ALL ORDERS
    builder.addCase("getAllOrdersRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getAllOrdersSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalOrder = action.payload.totalOrder;
        state.orders = action.payload.orders;
    });
    builder.addCase("getAllOrdersFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET SINGLE ORDER DETAILS
    builder.addCase("getSingleOrderDetailsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getSingleOrderDetailsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.order = action.payload.order;
    });
    builder.addCase("getSingleOrderDetailsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    // GET ORDERS BY STATUS
    builder.addCase("getOrdersByStatusRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getOrdersByStatusSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalOrder = action.payload.totalOrder;
        state.orders = action.payload.orders;
    });
    builder.addCase("getOrdersByStatusFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    //CANCEL ORDER
    builder.addCase("cancelOrderRequest", (state) => {
        state.loading = true;
    });    
    builder.addCase("cancelOrderSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.orders = state.orders.map(order =>
            order._id === action.payload.orderId ? { ...order, orderStatus: "canceled" } : order
        );
    });    
    builder.addCase("cancelOrderFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    
    //GET FINANCIAL SUMMARY BY USER
    builder.addCase("getFinancialSummaryByUserRequest", (state) => {
        state.loading = true;
    });    
    builder.addCase("getFinancialSummaryByUserSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.totalOrders = action.payload.totalOrders;
        state.totalSpent = action.payload.totalSpent;
        state.byStatus = action.payload.byStatus;
    });    
    builder.addCase("getFinancialSummaryByUserFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    
});
