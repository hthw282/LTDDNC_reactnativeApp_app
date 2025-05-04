import { getAuthToken } from "../../utils/auth";
import { clearCartStorage, getCartFromStorage, saveCartToStorage } from "../../utils/cartStorage";
import { server } from "../store";
import axios from "axios";

// Thêm sản phẩm vào giỏ hàng (Local/Server)
export const addToCart = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: "addToCartRequest" });

        const { data } = await axios.get(`${server}/product/${product.productId}`);

        const item = {
            productId: product.productId,
            name: data.name,
            price: data.price,
            image: data.image,
            quantity: product.quantity,
        };

        const { isAuth, user } = getState().user;

        if (isAuth && user?.id) {
            // Nếu đã đăng nhập, gửi lên server luôn
            const cartItem = {
                product: item.productId,
                quantity: item.quantity,
            };
            const token = await getAuthToken();

            try {
                const response = await axios.post(`${server}/cart/update`, { userId: user.id, items: [cartItem] }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch({
                    type: "addToCartSuccess",
                    payload: item,
                });
            } catch (error) {
                console.error("addToCart - Error updating server cart:", error);
                dispatch({
                    type: "addToCartFail",
                    payload: error.response?.data?.message || "Error adding to cart",
                });
                throw error; // Important: Re-throw to be caught by caller if needed
            }

        } else {
            // Chưa đăng nhập thì lưu vào local storage
            const localCart = await getCartFromStorage() || [];
            const existingProductIndex = localCart.findIndex((p) => p.productId === item.productId);

            if (existingProductIndex > -1) {
                localCart[existingProductIndex].quantity += item.quantity;
                if (localCart[existingProductIndex].quantity > 10) {
                    localCart[existingProductIndex].quantity = 10;
                }
            } else {
                localCart.push(item);
            }
            await saveCartToStorage(localCart);
            dispatch({
                type: "addToCartSuccess",
                payload: item,
            });
        }
    } catch (error) {
        dispatch({
            type: "addToCartFail",
            payload: error.response?.data?.message || "Error adding to cart",
        });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => async (dispatch, getState) => {
    const { isAuth, user } = getState().user;

    if (isAuth && user?.id) {
        try {
            const token = await getAuthToken();
            const cartData = await axios.get(`${server}/cart/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const cartItems = cartData.data?.cart?.items || [];
            if (cartItems) {
                const updatedItems = cartItems.filter(item => item.product._id !== productId);
                const response = await axios.post(`${server}/cart/update`, { userId: user.id, items: updatedItems }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                dispatch({
                    type: "removeFromCart",
                    payload: productId,
                });
            }
        } catch (error) {
            console.error("removeFromCart - Error removing from server cart:", error);
            dispatch({
                type: "removeFromCartFail",
                payload: error.response?.data?.message || "Error removing from cart",
            });
        }
    } else {
        /// Nếu chưa đăng nhập, xóa khỏi local storage
        const localCart = await getCartFromStorage() || [];
        const updatedCart = localCart.filter((p) => p.productId !== productId);
        await saveCartToStorage(updatedCart);
        dispatch({
            type: "removeFromCart",
            payload: productId,
        });
    }
};

// Cập nhật số lượng sản phẩm
export const updateQuantity = (productId, quantity) => async (dispatch, getState) => {
    const { isAuth, user } = getState().user;

    if (isAuth && user?.id) {
        // Update quantity on the server
        try {
            const token = await getAuthToken();
            const cartData = await axios.get(`${server}/cart/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const cartItems = cartData.data?.cart?.items || [];
            if (cartItems) {
                const updatedItems = cartItems.map(item => {
                    if (item.product._id === productId) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                const response = await axios.post(`${server}/cart/update`, { userId: user.id, items: updatedItems }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch({ type: "updateQuantity", payload: { productId, quantity } });
            }
        } catch (error) {
            console.error("Error updating quantity on server", error);
            dispatch({
                type: "updateQuantityFail",
                payload: "Error updating quantity",
            });
        }

    } else {
        // Update quantity in local storage
        const localCart = await getCartFromStorage();
        const updatedCart = localCart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
        );
        await saveCartToStorage(updatedCart);
        dispatch({ type: "updateQuantity", payload: { productId, quantity } });
    }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = () => async (dispatch, getState) => {
    const { isAuth, user } = getState().user;
    if (isAuth && user?.id) {
        // Clear server cart.  You might need a specific endpoint for this.
        const token = await getAuthToken();
        try {
            await axios.post(`${server}/cart/update`, { userId: user.id, items: [] }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }); // Assuming an empty items array clears the cart
        } catch (error) {
            console.error("Error clearing server cart:", error);
            dispatch({
                type: "clearCartFail",
                payload: "Error clearing cart",
            });
        }
    }
    await clearCartStorage();
    dispatch({ type: "clearCart" });
};

export const setCart = (cartItems) => async (dispatch) => {
    dispatch({ type: "setCart", payload: cartItems });
}

// Load cart from server
export const loadCartFromServer = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: "loadCartRequest" });

        const token = await getAuthToken();
        const { data } = await axios.get(`${server}/cart/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }); //  Use your server endpoint
        if (data.success) {
            const serverCartItems = data.cart.items.map(item => ({
                productId: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.images?.[0]?.url,
                quantity: item.quantity
            }));
            dispatch({ type: "loadCartSuccess", payload: serverCartItems });
            return serverCartItems; // Return the cart items
        } else {
            dispatch({ type: "loadCartSuccess", payload: [] });
            return [];
        }
    } catch (error) {
        dispatch({
            type: "loadCartFail",
            payload:
                error.response?.data?.message || "Error loading cart from server",
        });
        throw error;
    }
};
const mergeCarts = (serverCartItems, localCart) => {
    const mergedCart = [...serverCartItems];

    localCart.forEach(localItem => {
        // Kiểm tra xem localItem có productId không
        if (localItem.productId) { // Thêm kiểm tra này
            const existingServerItem = mergedCart.find(item => item.product._id === localItem.productId);
            if (existingServerItem) {
                // If the product exists in the server cart, update the quantity
                existingServerItem.quantity += localItem.quantity;
                if (existingServerItem.quantity > 10) {
                    existingServerItem.quantity = 10;
                }
            } else {
                // If the product doesn't exist in the server cart, add it
                const newItem = {
                    product: localItem.productId,
                    quantity: localItem.quantity,
                };
                mergedCart.push(newItem);
            }
        }
        // Nếu không có productId, bỏ qua item này.  Không cần làm gì cả.
    });
    return mergedCart;
};

export const syncCartAfterLogin = async (userId) => {
    const localCart = await getCartFromStorage() || [];
    const token = await getAuthToken();

    // Lọc bỏ các sản phẩm không có productId
    const validLocalCart = localCart.filter(item => item.productId);

    try {
        // Kiểm tra xem người dùng đã có giỏ hàng trên server chưa
        const serverCartData = await axios.get(`${server}/cart/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const existingServerCartItems = serverCartData.data?.cart?.items || [];
        const serverHasCart = true; // Fetch thành công, nghĩa là có cart

        const itemsToUpdate = [];

        // Hợp nhất giỏ hàng: cộng dồn số lượng nếu sản phẩm tồn tại cả ở local và server
        const serverProductMap = new Map(existingServerCartItems.map(item => [item.product._id.toString(), item]));

        for (const localItem of validLocalCart) {
            const serverItem = serverProductMap.get(localItem.productId);
            if (serverItem) {
                itemsToUpdate.push({
                    product: localItem.productId,
                    quantity: Math.min(serverItem.quantity + localItem.quantity, 10)
                });
                serverProductMap.delete(localItem.productId); // Đánh dấu đã xử lý
            } else {
                // Nếu sản phẩm chỉ có ở local, thêm mới
                itemsToUpdate.push({
                    product: localItem.productId,
                    quantity: localItem.quantity
                });
            }
        }

        // Các sản phẩm chỉ có trên server thì giữ nguyên
        serverProductMap.forEach(serverItem => {
            itemsToUpdate.push({
                product: serverItem.product._id,
                quantity: serverItem.quantity
            });
        });


        const response = await axios.post(
            `${server}/cart/update`,
            { userId, items: itemsToUpdate },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        await clearCartStorage();
        return response.data;

    } catch (error) {
        // Xử lý lỗi 404 (không tìm thấy giỏ hàng) - trường hợp người dùng mới
        if (error.response?.status === 404) {

            const itemsToCreate = validLocalCart.map(item => ({
                product: item.productId,
                quantity: item.quantity
            }));

            try {
                const createResponse = await axios.post(
                    `${server}/cart/update`, // Vẫn dùng endpoint update
                    { userId, items: itemsToCreate },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                await clearCartStorage();
                return createResponse.data;
            } catch (createError) {
                console.error("syncCartAfterLogin - Error creating new cart:", createError);
                throw createError;
            }
        } else {
            // Xử lý các lỗi khác
            console.error("syncCartAfterLogin - Failed to sync cart (other error):", error);
            throw error;
        }
    }
};