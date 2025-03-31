import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";
import { categoryReducer } from "./features/categoryReducer";
import { productReducer } from "./features/productReducer";
import { orderReducer } from "./features/orderReducer";
import cartReducer from "./features/cartReducer";
import { voucherReducer } from "./features/voucherReducer";
import { loyaltyReducer } from "./features/loyaltyPointReducer";
import { favoriteReducer } from "./features/favoriteReducer";
export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
    voucher: voucherReducer,
    loyalty: loyaltyReducer,
    favorite: favoriteReducer,
  },
});

//HOST
export const server = "http://10.69.5.54:8080/api/v1";

