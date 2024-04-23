import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuth: savedUser ? true : false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            state.isAuth = true;
        },

        removeUser: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.isAuth = false;
        },
       
    },
});


export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;