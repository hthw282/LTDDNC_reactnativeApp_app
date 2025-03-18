import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";
import { categoryReducer } from "./features/categoryReducer";
import { productReducer } from "./features/productReducer";
import { orderReducer } from "./features/orderReducer";
import cartReducer from "./features/cartReducer";
export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

//HOST
export const server = "http://10.69.5.63:8080/api/v1";

