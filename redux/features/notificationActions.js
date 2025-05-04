import { server } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";

//get notifications action
export const getNotificationsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'getNotificationsRequest' });

        const token = await getAuthToken();

        const { data } = await axios.get(`${server}/notification/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getNotificationsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getNotificationsFail",
            payload: error.response?.data?.message || "Error create order"
        });
    }
};

// Action to add a new notification in realtime
export const addNotificationRealtime = (notification) => async (dispatch) => {
    try {
        dispatch({
            type: "addNotificationRealtime",
            payload: notification,
        });
    } catch (error) {
        console.log("Error dispatching realtime notification:", error);
    }
};

// Action to send notification from admin to a specific user
export const sendNotificationToUser = (notificationData) => async (dispatch) => {
    try {
        dispatch({ type: 'sendNotificationRequest' }); // New request type for sending

        const token = await getAuthToken();
        const { data } = await axios.post(`${server}/notification/send`, notificationData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: 'sendNotificationSuccess', payload: data }); // New success type
        // No need to dispatch addNotificationRealtime here, the server will emit it.

    } catch (error) {
        dispatch({
            type: "sendNotificationFail", // New fail type
            payload: error.response?.data?.message || "Error sending notification"
        });
    }
};
// Action to send notification from admin to all users
export const sendNotificationToAll = (notificationData) => async (dispatch) => {
    try {
        dispatch({ type: 'sendNotificationRequest' }); // New request type for sending

        const token = await getAuthToken();
        const { data } = await axios.post(`${server}/notification/send-to-all`, notificationData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: 'sendNotificationSuccess', payload: data }); // New success type
        // No need to dispatch addNotificationRealtime here, the server will emit it.

    } catch (error) {
        dispatch({
            type: "sendNotificationFail", // New fail type
            payload: error.response?.data?.message || "Error sending notification"
        });
    }
};

export const markNotificationAsRead = (notificationId) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'markNotificationAsReadRequest' });
        const token = await getAuthToken();
        const { user } = getState().user; // Lấy thông tin người dùng từ Redux store

        const { data } = await axios.post(
            `${server}/notification/mark-as-read`,
            { notificationId, userId: user._id }, // Thêm userId vào đây
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch({ type: 'markNotificationAsReadSuccess', payload: data });
    } catch (error) {
        console.log("Error marking notification as read:", error);
        dispatch({
            type: "markNotificationAsReadFail",
            payload: error.response?.data?.message || "Error sending notification"
        });
    }
};