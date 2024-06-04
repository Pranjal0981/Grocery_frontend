import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuth: savedUser ? true : false,
    wishlist: null,
    checkOutCart: null,
    tokenExpiration: null,
    unavailableProduct: null,
    isCashOnDeliveryProcessing: false // New state to manage the loading state for cash on delivery
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            state.isAuth = true;
        },
        saveTokenExpiration: (state, action) => {
            localStorage.setItem("tokenExpiration", action.payload);
            state.tokenExpiration = action.payload;
        },
        removeUser: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.isAuth = false;
        },
        saveWishlist: (state, action) => {
            state.wishlist = action.payload
        },
        saveCheckOutCart: (state, action) => {
            state.checkOutCart = action.payload
        },
        saveUnavailableProduct: (state, action) => {
            state.unavailableProduct = action.payload
        },
        setCashOnDeliveryProcessing: (state, action) => {
            state.isCashOnDeliveryProcessing = action.payload;
        }
    },
});

export const {
    saveUser,
    removeUser,
    saveWishlist,
    saveCheckOutCart,
    saveTokenExpiration,
    saveUnavailableProduct,
    setCashOnDeliveryProcessing
} = userSlice.actions;

export default userSlice.reducer;
