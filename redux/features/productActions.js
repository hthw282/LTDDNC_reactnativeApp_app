import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllProductsRequest' });

        const { data } = await axios.get(`${server}/product/get-all`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getAllProductsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getAllProductsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//get top products
export const getTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'getTopProductsRequest' });

        const { data } = await axios.get(`${server}/product/top`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getTopProductsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getTopProductsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//get single product
export const getSingleProducts = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'getSingleProductsRequest' });

        const { data } = await axios.get(`${server}/product/${productId}`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getSingleProductsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getSingleProductsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//create products
export const createProduct = () => async (dispatch) => {
    try {
        dispatch({ type: 'createProductRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.post(`${server}/product/create`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'createProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "createProductFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

// update product
export const updateProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProductRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.put(`${server}/product/${productId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'updateProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "updateProductFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

// update product image
export const updateProductImage = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProductImageRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.put(`${server}/product/image/${productId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'updateProductImageSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "updateProductImageFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

// delete product image
export const deleteProductImage = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteProductImageRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.delete(`${server}/product/delete-image/${productId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteProductImageSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteProductImageFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

// delete product 
export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteProductRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.delete(`${server}/product/delete/${productId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteProductFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};
