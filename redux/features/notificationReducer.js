import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: "",
    notifications: []
};

export const notificationReducer = createReducer(initialState, (builder) => {
    // GET NOTIFICATIONS
    builder.addCase("getNotificationsRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("getNotificationsSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notifications = action.payload.notifications;
    });
    builder.addCase("getNotificationsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });

    // ADD REALTIME NOTIFICATION
    builder.addCase("addNotificationRealtime", (state, action) => {
        state.notifications = [action.payload, ...(state.notifications || [])];
    });
    // SEND NOTIFICATION (ADMIN)
    builder.addCase("sendNotificationRequest", (state) => { // New case
        state.loading = true;
    });
    builder.addCase("sendNotificationSuccess", (state, action) => { // New case
        state.loading = false;
        state.message = action.payload.message;
        //  state.notifications = [action.payload.notification, ...(state.notifications || [])]; // Không thêm vào đây, server emit
    });
    builder.addCase("sendNotificationFail", (state, action) => { // New case
        state.loading = false;
        state.error = action.payload;
    });

    // MARK NOTIFICATION AS READ
    builder.addCase("markNotificationAsReadRequest", (state) => {
        state.loading = true;
    });
    builder.addCase("markNotificationAsReadSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notifications = state.notifications.map(notification =>
            notification._id === action.payload.notificationId
                ? { ...notification, isRead: true }
                : notification
        );
    });
    builder.addCase("markNotificationAsReadFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
});