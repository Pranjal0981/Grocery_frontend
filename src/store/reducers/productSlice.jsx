import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null,
    loading: false,
    store:null
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        saveProduct: (state, action) => {
            state.product = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        removeProduct: (state) => {
            state.product = [];

        },
        saveStoreStocks:(state,action)=>{
            
            state.store=action.payload
        }

    },
});

export const { saveProduct, removeProduct, setLoading, saveStoreStocks } = productSlice.actions;

export default productSlice.reducer;