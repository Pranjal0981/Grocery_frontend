import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null,
    loading: false,
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

    },
});

export const { saveProduct, removeProduct, setLoading } = productSlice.actions;

export default productSlice.reducer;