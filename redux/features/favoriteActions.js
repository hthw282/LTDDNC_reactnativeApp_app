import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthToken } from "../../utils/auth";

export const addToFavorite = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'addToFavoriteRequest' });

        const token = await getAuthToken();

        const { data } = await axios.post(`${server}/favorites/add`, { productId }, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'addToFavoriteSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "addToFavoriteFail",
            payload: error.response?.data?.message || "Error adding product to favorite"
        });
    }
}

// remove product from favorite
export const removeFromFavorite = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'removeFromFavoriteRequest' });

        const token = await getAuthToken();

        const { data } = await axios.delete(`${server}/favorites/delete/${productId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'removeFromFavoriteSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "removeFromFavoriteFail",
            payload: error.response?.data?.message || "Error removing product from favorite"
        });
    }
}

// get user favorites
export const getUserFavorites = () => async (dispatch) => {
    try {
        dispatch({ type: 'getUserFavoritesRequest' });

        const token = await getAuthToken();

        const { data } = await axios.get(`${server}/favorites/user-favorites`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getUserFavoritesSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getUserFavoritesFail",
            payload: error.response?.data?.message || "Error fetching favorite products"
        });
    }
};