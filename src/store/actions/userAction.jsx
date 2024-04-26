import { saveUser, removeUser, saveWishlist, saveCheckOutCart } from "../reducers/userSlice";
import axios from '../../config/axios'
import { saveProduct } from "../reducers/productSlice";

export const asyncCurrentUser = (token) => async (dispatch, getState) => {
    try {
        console.log("token",token)
        const response = await axios.post('/user/currentUser', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
      await dispatch(saveUser(response.data.user));
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
       await dispatch(asyncCurrentUser(response.data.token))
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

export const asyncFetchWishlist=(id)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchWishlist/${id}`)
        console.log(response)
        dispatch(saveWishlist(response.data.data.products))
    } catch (error) {
        console.log(error)
    }
}

export const asyncAddToWishlist=(userId,data)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.post(`/user/addToWishlist/${userId}`,data)
        console.log(resposne)
    } catch (error) {
        console.log(error)
    }
}



export const asyncAddToCart = (userId, data) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/user/addToCart/${userId}`, data)
        console.log(response)
        dispatch(saveCheckOutCart(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const asyncDeleteFromWishlist = (userId, productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/user/deleteFromWishlist/${userId}/${productId}`)
        console.log(response)
        dispatch(asyncFetchWishlist(userId))
    } catch (error) {
        console.log(error)
    }
}


export const asyncFetchCartProduct=(userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchCart/${userId}`)
        console.log(response)
        dispatch(saveCheckOutCart(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const asyncSendForgetLink=(email)=>async(dispatch,getState)=>{
    try {
        const response = await axios.post('/user/send-mail',email)
        console.log(response)
    } catch (error) {
        console.log(error)
        
    }
}

export const asyncResetPassword = (id, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/user/forget-link/${id}`, { password }); // Pass password as an object
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export const asyncDeleteCheckoutCart=(userId,productId)=>async(dispatch,getState)=>{
    try {
        const response = await axios.delete(`/user/deleteFromCart/${userId}/${productId}`)
        console.log(response)
        dispatch(asyncFetchCartProduct(userId))
    } catch (error) {
        console.log(error)
    }
}

export const asyncAddAddress=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post(`/user/addAddress`,data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export const asyncDeleteAddress =(index,userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.delete(`/user/deleteAddress/${userId}/${index}`)
        console.log(response)
        dispatch(asyncCurrentUser(userId))
    } catch (error) {
        console.log(error)        
    }
}

export const asyncUpdateUser=(data,userId)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response = await axios.post(`/user/update/${userId}`,data)
        console.log(response)
        await dispatch(asyncCurrentUser(userId))
    } catch (error) {
        console.log(error)
    }
}


export const asyncDeleteAccount = (userId) => async (dispatch, getState) => {
    try {
            const response = await axios.delete(`/user/deleteAccount/${userId}`)
        console.log(response)
        await dispatch(removeUser())
    } catch (error) {
        console.log(error)
    }
}

export const asyncCustomerOrder=(data,userId)=>async(dispatch,getState)=>{
try {
    console.log(data)
    const response=await axios.post(`/user/order/${userId}`,data.checkOutCart)
    console.log(response)
} catch (error) {
    console.log(error)
    
}
}

export const asyncFetchCustomerOrder=(userId)=>async(dispatch,getState)=>{
    try {
        const resposne=await axios.get(`/user/fetchOrders/${userId}`)
        console.log(resposne)
    } catch (error) {
        console.log(error)
    }
}