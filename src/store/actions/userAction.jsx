import { saveUser, removeUser } from "../reducers/userSlice";
import axios from '../../config/axios'
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


export const asyncSignupUser=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/user/signup',data)
        console.log(response)
        dispatch(saveUser(response.data.token));
    } catch (error) {
        console.log(error)
        
    }
}


export const asyncSignIn=(data)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response=await axios.post('/user/login',data)
        console.log(response)
        dispatch(saveUser(response.data.token))
        dispatch(asyncCurrentUser(response.data.token))
    } catch (error) {
        console.log(error)
    }
}

export const asyncSignOut=(data)=>async(dispacth,getState)=>{
    try {
        const response=await axios.get('/user/logout')
        dispacth(removeUser())
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


export const asyncForgetPassword=(email)=>async(dispatch,getState)=>{
    try {
        const response =await axios.post('/user/forget-password',email)
        console.log(response)
    } catch (error) {
        console.log(error)
        
    }
}