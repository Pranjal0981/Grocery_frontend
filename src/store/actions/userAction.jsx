import { saveUser, removeUser } from "../reducers/userSlice";
import axios from '../../config/axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { saveProduct } from "../reducers/productSlice";

export const asyncCurrentUser = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user/currentUser', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
    }
};


export const asyncSignup=()=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/user/signup')
        console.log(response)
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.log(error)
        
    }
}


export const asyncSignIn=(data)=>async(dispatch,getState)=>{
    try {
        const resposne=await axios.post('/user/signin',data)
        console.log(resposne)
        dispatch(asyncCurrentUser())
    } catch (error) {
        console.log(error)
    }
}

export const asyncFetchWishlist=()=>async(dispatch,getState)=>{
    try {
        const response=await axios.get('/user/fetchWishlist')
        dispatch(saveProduct(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const asyncAddToWishlist=(userId,data)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.post(`/addToCart/${userId}`,data)
        console.log(resposne)
    } catch (error) {
        console.log(error)
    }
}


export const asyncDeleteFromWishlist=(userId,productId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.delete(`/user/${userId}/${productId}`)
        dispatch(saveProduct(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const asyncFetchCart = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('/user/fetchWishlist')
        dispatch(saveProduct(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const asyncAddToCart = (userId, data) => async (dispatch, getState) => {
    try {
        const resposne = await axios.post(`/addToCart/${userId}`, data)
        console.log(resposne)
    } catch (error) {
        console.log(error)
    }
}


export const asyncDeleteFromCart = (userId, productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/user/${userId}/${productId}`)
        dispatch(saveProduct(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const asyncFetchCartProduct=(userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/fetchCart/${userId}`)
        dispatch(saveProduct(response.data))
    } catch (error) {
        console.log(error)
    }
}