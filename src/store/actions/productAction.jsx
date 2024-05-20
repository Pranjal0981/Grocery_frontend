import { saveProduct, removeProduct, setLoading, saveStoreStocks } from "../reducers/productSlice";
import axios from "../../config/axios";
import { toast } from "react-toastify";
export const asyncFetchProducts = (page, preferredStore) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const url = preferredStore ? `/products/getproduct?page=${page}&preferredStore=${preferredStore}` : `/products/getproduct?page=${page}`;
        const response = await axios.get(url);
        console.log(response)
        const totalPages = response.data.totalPages; // Extract totalPages from response
        await dispatch(saveProduct(response.data.data));
        return totalPages; // Return totalPages to be used in component logic
    } catch (error) {
        toast.error('Error fetching  products:', error.response?.data || error.message);
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const asyncExploreById = (id) => async (dispatch, getState) => {
    try {
        console.log(id)
        dispatch(setLoading(true));
        const response = await axios.get(`/products/explore/${id}`)
        console.log(response)
        await dispatch(saveProduct(response.data.data.product));
        await dispatch(saveStoreStocks(response.data.data.stores))
    } catch (error) {
        console.log(error)
        throw error;
    }
    finally {
        dispatch(setLoading(false));

    }
}

export const asyncFetchCategorisedPro = (category,page) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/products/category/${category}?page=${page}`)
        dispatch(saveProduct(response?.data?.data))
    } catch (error) {
toast.error(error.response.data.message)

    }
}

export const asyncSearch = (searchTerm, selectedCategory, store) => async (dispatch, getState) => {
    try {
        const encodedCategory = encodeURIComponent(selectedCategory);
        let url = `/products/searchProducts/?searchTerm=${searchTerm}&category=${encodedCategory}`;

        // Check if store is defined and not empty, then append it to the URL
        if (store && store.trim() !== '') {
            url += `&store=${store}`;
        }

        const response = await axios.get(url);
        dispatch(saveProduct(response.data.products));
    } catch (error) {
        console.log(error);
    }
};


export const asyncFetchStorePro = (store,page) => async (dispatch, getState) => {
    try {
        const response =await axios.get(`/products/store/${store}?page=${page}`)
        dispatch(saveProduct(response?.data?.data))

    } catch (error) {
        toast.error(error.response.data.message)

    }
}

export const asyncFilterAll = (queryParams) => async (dispatch, getState) => {
    try {
        const response = await axios.get('/products/filter', { params: queryParams });
        dispatch(saveProduct(response.data.data))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncFetchProdByBrand=(brand)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/products/brand/${brand}`)
        dispatch(saveProduct(response.data.products))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncFetchStorebyPID=(productId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/products/stores/${productId}`)
        dispatch(saveStoreStocks(response.data.stores))
    } catch (error) {
        console.log(error)
    }
}