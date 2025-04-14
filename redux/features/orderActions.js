import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//create order action
export const createOrder = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createOrderRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.post(`${server}/order/create`, formData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'createOrderSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "createOrderFail",
            payload: error.response?.data?.message || "Error create order"
        });
    }
};

//get all orders
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllOrdersRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/order/my-orders`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getAllOrdersSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getAllOrdersFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//get single order details
export const getSingleOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: 'getSingleOrderDetailsRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/order/my-orders/${orderId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getSingleOrderDetailsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getSingleOrderDetailsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//get orders by status
export const getOrdersByStatus = (status) => async (dispatch) => {
    try {
        dispatch({ type: 'getOrdersByStatusRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/order/status/${status}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getOrdersByStatusSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getOrdersByStatusFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: "cancelOrderRequest" });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.put(`${server}/order/cancel/${orderId}`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: "cancelOrderSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "cancelOrderFail",
            payload: error.response?.data?.message || "Failed to cancel order",
        });
    }
};

export const getFinancialSummaryByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "getFinancialSummaryByUserRequest" });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/order/financial-summary/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: "getFinancialSummaryByUserSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "getFinancialSummaryByUserFail",
            payload: error.response?.data?.message || "Failed to get financial summary",
        });
    }
}
