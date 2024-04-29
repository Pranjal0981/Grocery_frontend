import { saveUser, removeUser, saveWishlist, saveCheckOutCart } from "../reducers/userSlice";
import axios from '../../config/axios'
import { saveProduct } from "../reducers/productSlice";
import { saveOrders } from "../reducers/adminSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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


export const asyncSignupUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('/user/signup', data);
        console.log(response);
        dispatch(saveUser(response.data));

        // Show success notification
        toast.success("SignUp Successfully !")
    } catch (error) {
        console.error(error);
        // Show error notification
        toast.error('Failed to sign up user. Please try again later.');
    }
};


export const asyncSignIn=(data)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response=await axios.post('/user/login',data)
        console.log(response)
        await dispatch(asyncCurrentUser(response.data.token));
        toast.success("LoggedIn Successfully !")

    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
}

export const asyncSignOut=(data)=>async(dispacth,getState)=>{
    try {
        const response=await axios.get('/user/logout')
        dispacth(removeUser())
        toast.success("Logout Successfully !")

    } catch (error) {
        console.log(error)
        toast.error("Logout Error !")

    }
}

export const asyncFetchWishlist=(id)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchWishlist/${id}`)
        console.log(response)
        dispatch(saveWishlist(response.data.data.products))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncAddToWishlist=(userId,data)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.post(`/user/addToWishlist/${userId}`,data)
        console.log(resposne)
    } catch (error) {
        toast.error(error.response.data.message)
    }
}



export const asyncAddToCart = (userId, data) => async (dispatch, getState) => {

    try {
        console.log(data)
        const response = await axios.post(`/user/addToCart/${userId}`, data)
        console.log(response)
        toast.success("Added to cart")

       await dispatch(saveCheckOutCart(response.data))
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

    }
}


export const asyncDeleteFromWishlist = (userId, productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/user/deleteFromWishlist/${userId}/${productId}`)
        console.log(response)
        toast.success("Product Deleted")
        dispatch(asyncFetchWishlist(userId))
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

    }
}


export const asyncFetchCartProduct=(userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchCart/${userId}`)
        console.log(response)
        dispatch(saveCheckOutCart(response.data))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


export const asyncSendForgetLink=(email)=>async(dispatch,getState)=>{
    try {
        const response = await axios.post('/user/send-mail',email)
        toast.success("Reset mail sent")
    } catch (error) {
        console.log(error)
        toast.error("Error sending mail")

        
    }
}

export const asyncResetPassword = (id, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/user/forget-link/${id}`, { password }); // Pass password as an object
        toast.success("Password Reset Successfully")
    } catch (error) {
        toast.error("Error reseting password")

    }
};

export const asyncDeleteCheckoutCart=(userId,productId)=>async(dispatch,getState)=>{
    try {
        const response = await axios.delete(`/user/deleteFromCart/${userId}/${productId}`)
        toast.success("Product Deleted")

        dispatch(asyncFetchCartProduct(userId))
    } catch (error) {
        toast.error(error.response.data.message)

    }
}

export const asyncAddAddress=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post(`/user/addAddress`,data)
        toast.success("Address Added")

        dispatch(saveUser(response.data.user))
    } catch (error) {
        console.log(error)
        toast.error("Address Error")

    }
}

export const asyncDeleteAddress =(index,userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.delete(`/user/deleteAddress/${userId}/${index}`)
        console.log(response)
        toast.warn("Address Deleted")
        dispatch(asyncCurrentUser(userId))
    } catch (error) {
        console.log(error)     
        toast.error("Error deleting address")

    }
}

export const asyncUpdateUser=(data,userId)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response = await axios.post(`/user/update/${userId}`,data)
        console.log(response)
        toast.success("Updated successfully")

        await dispatch(asyncCurrentUser(userId))
    } catch (error) {
        console.log(error)
        toast.error("Error updating information")

    }
}


export const asyncDeleteAccount = (userId) => async (dispatch, getState) => {
    try {
            const response = await axios.delete(`/user/deleteAccount/${userId}`)
        console.log(response)
        toast.warn("Account deleted successfully")

        await dispatch(removeUser())
    } catch (error) {
        console.log(error)
        toast.error("Error deleting account")

    }
}

export const asyncCustomerOrder = (data, userId,userEmail, pdfBlob) => async (dispatch, getState) => {
    try {
        // Create FormData and append data
        const formData = new FormData();
        formData.append('checkOutCart', JSON.stringify(data.checkOutCart)); // Assuming data.checkOutCart is the JSON object you want to send
        formData.append('pdfFile', pdfBlob, 'checkout_bill.pdf');
        formData.append('email', userEmail)
        // Send POST request with FormData
        const response = await axios.post(`/user/order/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export const asyncFetchCustomerOrder=(userId)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.get(`/user/fetchOrders/${userId}`)
        console.log(resposne.data)
        dispatch(saveOrders(resposne.data))
    } catch (error) {
        console.log(error)
    }
}

export const asyncUpdateStock = (productId, newStock)=>async(dispatch,getState)=>{
    try {
        console.log(productId,newStock)
        const response = await axios.post(`/products/updateProductStock/${productId}`, { newStock })
    } catch (error) {
     console.log(error)   
    }
}

export const asyncReturnRequest = (orderId,userId)=>async(dispatch,getState)=>{
    try {
        console.log(userId)
        const response=await axios.post(`/user/order/returnRequest/${orderId}`)
        await dispatch(asyncFetchCustomerOrder(userId))

        toast.success("Return Requested")

    } catch (error) {
        console.log(error)
        toast.error("Error ")

    }
}

export const asyncContactUs=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/user/contactus',data)
        toast.success("Thanks for contacting with us! We will reply shortly")
    } catch (error) {
        toast.error('Please try again')
    }
}