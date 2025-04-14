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
        const token = await AsyncStorage.getItem("@auth");
        if (token) {
            dispatch(addViewedProduct(productId, token));
        }
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

//create review and comment
export const addProductReview = (productId, comment, rating) => async (dispatch) => {
    try {
        dispatch({ type: 'addProductReviewRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const {data} = await axios.put(`${server}/product/${productId}/review`, {comment, rating}, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'addProductReviewSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "addProductReviewFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
}

//get product reviews
export const getProductReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'getProductReviewsRequest' });

        const { data } = await axios.get(`${server}/product/${productId}/reviews`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getProductReviewsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getProductReviewsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
}

//add comment
export const addComment = (productId, comment) => async (dispatch) => {
    try {
        dispatch({ type: 'addCommentRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const {data} = await axios.post(`${server}/product/comment`, {productId, comment}, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'addCommentSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "addCommentFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
}

//get all comments by product  
export const getCommentsByProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'getCommentsByProductRequest' });

        const { data } = await axios.get(`${server}/product/comments/${productId}`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getCommentsByProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getCommentsByProductFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//delete comment
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteCommentRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.delete(`${server}/product/comment/${commentId}`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteCommentSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteCommentFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//get similar products
export const getSimilarProducts = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'getSimilarProductsRequest' });

        const { data } = await axios.get(`${server}/product/similar/${productId}`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'getSimilarProductsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getSimilarProductsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//add product to viewed
export const addViewedProduct = (productId, token) => async (dispatch) => {
    try {
        dispatch({ type: 'addViewedProductRequest' });

        const { data } = await axios.post(`${server}/product/${productId}/viewed`,
            {},
            {
                headers: {
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                },
            }
        );
        dispatch({ type: 'addViewedProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "addViewedProductFail",
            payload: error.response?.data?.message || "Error save viewed product"
        });
    }
};

//get viewed products
export const getViewedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'getViewedProductsRequest' });

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/product/viewed`, {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'getViewedProductsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getViewedProductsFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
};

//GET TOTAL PURCHASES
export const countTotalPurchasesForProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: 'countTotalPurchasesForProductRequest' });

        const { data } = await axios.get(`${server}/product/count-purchase/${productId}`, {
            headers: {
                'Content-Type':'application/json',
            }
        });
        dispatch({ type: 'countTotalPurchasesForProductSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "countTotalPurchasesForProductFail",
            payload: error.response?.data?.message || "Error get all orders"
        });
    }
}