import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//get notifications action
export const getNotificationsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'getNotificationsRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/notification/${userId}`, {
            headers: {
                'Content-Type':'application/json',
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
  