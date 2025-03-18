import { server } from "../store";
import axios from "axios";

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => async (dispatch) => {
    try {
        dispatch({ type: "addToCartRequest" });

        // Có thể fetch dữ liệu sản phẩm nếu cần
        const { data } = await axios.get(`${server}/product/${product.productId}`);

        dispatch({
            type: "addToCartSuccess",
            payload: {
                productId: product.productId,
                name: product.name || data.name,
                price: product.price || data.price,
                image: product.image || data.image,
                quantity: product.quantity,
            },
        });
    } catch (error) {
        dispatch({
            type: "addToCartFail",
            payload: error.response?.data?.message || "Error adding to cart",
        });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => async (dispatch) => {
    dispatch({ type: "removeFromCart", payload: productId });
};

// Cập nhật số lượng sản phẩm
export const updateQuantity = (productId, quantity) => async (dispatch) => {
    dispatch({
        type: "updateQuantity",
        payload: { productId, quantity },
    });
};

// Xóa toàn bộ giỏ hàng
export const clearCart = () => async (dispatch) => {
    dispatch({ type: "clearCart" });
};
