import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [], // Array to store all loaded products
    currentPageProducts: [], // Array to store products for the current page
    loading: false,
    store: null,
    product:null,
    currentPage: 1,
    totalPages: 1 // Initialize totalPages with 1
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        saveProduct: (state, action) => {
            const newProducts = action?.payload?.filter(product => !state.allProducts.some(p => p._id === product._id));
            state.allProducts = [...state.allProducts, ...newProducts];
            state.currentPageProducts = [...state.allProducts];
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        removeProduct: (state) => {
            state.allProducts = []; // Clear all products
        },
        saveStoreStocks: (state, action) => {
            state.store = action.payload;
        },
        saveProductById:(state,action)=>{
            state.product = action.payload; // Clear all products

        },
        saveFilteredProduct:(state,action)=>{
            state.allProducts=action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            // Update currentPageProducts based on the current page
            const startIndex = (action.payload - 1) * 8;
            const endIndex = startIndex + 8;
            state.currentPageProducts = state.allProducts.slice(startIndex, endIndex);
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        }
    },
});

export const { saveProduct, removeProduct, saveFilteredProduct,saveProductById, setLoading, saveStoreStocks, setCurrentPage, setTotalPages } = productSlice.actions;

export default productSlice.reducer;
