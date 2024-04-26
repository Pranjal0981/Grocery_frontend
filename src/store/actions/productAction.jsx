import { saveProduct, removeProduct, setLoading } from "../reducers/productSlice";
import axios from "../../config/axios";
export const asyncFetchProducts = (page) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/products/getproduct?page=${page}`);
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
        dispatch(setLoading(true));
        const response = await axios.get(`/products/explore/${id}`)
        console.log(response)
        await dispatch(saveProduct(response.data.data));
    } catch (error) {
        toast.error('Error fetching current user data:', error.response?.data || error.message);
        throw error;
    }
    finally {
        dispatch(setLoading(false));

    }
}

export const asyncFetchCategorisedPro = (category) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/products/category/${category}`)
        dispatch(saveProduct(response?.data?.data))
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
export const asyncSearch = (searchTerm, selectedCategory) => async (dispatch, getState) => {
    try {
        const encodedCategory = encodeURIComponent(selectedCategory);
        const response = await axios.get(`/products/searchProducts/?searchTerm=${searchTerm}&category=${encodedCategory}`);
        dispatch(saveProduct(response.data.products))
    } catch (error) {
        console.log(error)
    }
};

export const asyncFetchStorePro = (store) => async (dispatch, getState) => {
    try {
        const response =await axios.get(`/products/store/${store}`)
        console.log(response)
        dispatch(saveProduct(response?.data?.data))

    } catch (error) {
        console.log(error)
    }
}

export const asyncFilterAll = (queryParams) => async (dispatch, getState) => {
    try {
        console.log(queryParams)
        const response = await axios.get('/products/filter', { params: queryParams });
        console.log(response)
        dispatch(saveProduct(response.data.data))
    } catch (error) {
        toast.error(error)
    }
}

export const asyncFetchProdByBrand=(brand)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/products/brand/${brand}`)
        console.log(response)
        dispatch(saveProduct(response.data.products))
    } catch (error) {
        console.log(error)
    }
}