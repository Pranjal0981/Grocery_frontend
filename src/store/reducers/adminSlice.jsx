import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    users: null,
    dashboardinfo: null,
    totalPages: 0 ,// Initialize totalPages in the initial state
    duplicateProductsByName: [],
    duplicateProductsByCode: [],
    invalidStockOrMissingStoreNameProducts: [],

}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveStoreProducts: (state, action) => {
            console.log(action.payload)
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages; // Save tota
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
        },
        saveOutOfstock(state, action) {
            console.log(action.payload)
            state.duplicateProductsByName = action.payload.outOfStock.duplicateProductsByName;
            state.duplicateProductsByCode = action.payload.outOfStock.duplicateProductsByCode;
            state.invalidStockOrMissingStoreNameProducts = action.payload.outOfStock.invalidStockOrMissingStoreNameProducts;
            state.totalPages = action.payload.totalPages;
        },
    },
});


export const { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading, saveAllProducts, saveOutOfstock } = adminSlice.actions;

export default adminSlice.reducer;