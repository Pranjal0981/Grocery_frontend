import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuth: savedUser ? true : false,
    wishlist: null,
    checkOutCart:null

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            console.log(action.payload)
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            state.isAuth = true;
        },

        removeUser: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.isAuth = false;
        },
        saveWishlist: (state, action) => {
            state.wishlist = action.payload
        },
        saveCheckOutCart:(state,action)=>{
            console.log(action.payload)
            state.checkOutCart=action.payload
        }
    },
});


export const { saveUser, removeUser, saveWishlist, saveCheckOutCart } = userSlice.actions;

export default userSlice.reducer;