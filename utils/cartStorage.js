import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart"; 

// Hàm lấy giỏ hàng từ AsyncStorage
export const getCartFromStorage = async () => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return [];
  }
};

// Hàm lưu giỏ hàng vào AsyncStorage
export const saveCartToStorage = async (cartItems) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Lỗi khi lưu giỏ hàng:", error);
  }
};

export const clearCartStorage = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
  }
};