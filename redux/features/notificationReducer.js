import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: "",
    notifications: []
  };

export const notificationReducer = createReducer(initialState, (builder) => {
    // CREATE ORDER
    builder.addCase("getNotificationsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getNotificationsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notifications = action.payload.notifications; // Lưu thông tin notifications vào Redux
    });
    builder.addCase("getNotificationsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload; //.error
    });

    //add notification realtime
    builder.addCase("addNotificationRealtime", (state, action) => {
        state.notifications = [action.payload, ...(state.notifications || [])];
    });
});