import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    users: null,
    dashboardinfo: null
}

export const superAdminSlice = createSlice({
    name: "superAdmin",
    initialState,
    reducers: {
        saveStoreProducts: (state, action) => {
            state.products = action.payload
            state.loading = false
        },
        saveAllUsers: (state, action) => {
            state.users = action.payload
        },
        saveOrders: (state, action) => {
            state.products = action.payload
        },
        saveDashBoardInfo: (state, action) => {
            console.log(action.payload)
            state.dashboardinfo = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        saveAllProducts: (state, action) => {
            state.products = action.payload
        }
    },
});


export const { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading, saveAllProducts } = superAdminSlice.actions;

export default superAdminSlice.reducer;