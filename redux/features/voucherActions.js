import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//create voucher
export const createVoucher = (voucherData) => async (dispatch) => {
    try {
        dispatch({ type: 'createVoucherRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.post(`${server}/voucher/create`, voucherData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'createVoucherSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "createVoucherFail",
            payload: error.response?.data?.message || "Error creating voucher"
        });
    }
};

// get all vouchers
export const getAllVouchers = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllVouchersRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/voucher/all`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getAllVouchersSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getAllVouchersFail",
            payload: error.response?.data?.message || "Error fetching vouchers"
        });
    }
};

// delete voucher
export const deleteVoucher = (voucherId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteVoucherRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");
        
        const { data } = await axios.delete(`${server}/voucher/delete/${voucherId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteVoucherSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteVoucherFail",
            payload: error.response?.data?.message || "Error deleting voucher"
        });
    }
};