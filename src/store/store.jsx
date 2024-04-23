import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import adminReducer from './reducers/adminSlice'
import productReducer from "./reducers/productSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});