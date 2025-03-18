import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm lấy giỏ hàng từ AsyncStorage
export const getCartFromStorage = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return [];
  }
};

// Hàm lưu giỏ hàng vào AsyncStorage
export const saveCartToStorage = async (cartItems) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Lỗi khi lưu giỏ hàng:", error);
  }
};
