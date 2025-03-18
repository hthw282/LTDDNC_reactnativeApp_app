import { server } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//create category action
export const createCategory = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createCategoryRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.post(`${server}/category/create`, formData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'createCategorySuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "createCategoryFail",
            payload: error.response?.data?.message || "Error create order"
        });
    }
};

//get all orders
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllCategoriesRequest' });


        const { data } = await axios.get(`${server}/category/get-all`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getAllCategoriesSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getAllCategoriesFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//delete category
export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteCategoryRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.delete(`${server}/category/delete/${categoryId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteCategorySuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteCategoryFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//update category
export const updateCategory = (categoryId, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateCategoryRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.put(`${server}/category/update/${categoryId}`, formData, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'updateCategorySuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "updateCategoryFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};