import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthToken } from "../../utils/auth";

//add loyalty points
export const addLoyaltyPoints = (loyaltyData) => async (dispatch) => {
    try {
        dispatch({ type: 'addLoyaltyPointsRequest' });

        const token = await getAuthToken();

        const { data } = await axios.post(`${server}/loyalty/add`, loyaltyData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'addLoyaltyPointsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "addLoyaltyPointsFail",
            payload: error.response?.data?.message || "Error adding loyalty points"
        });
    }
};

//get user points
export const getUserPoints = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'getUserPointsRequest' });

        const token = await getAuthToken();
        
        const { data } = await axios.get(`${server}/loyalty/${userId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getUserPointsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getUserPointsFail",
            payload: error.response?.data?.message || "Error fetching user points"
        });
    }
};