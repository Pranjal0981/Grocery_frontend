import { saveUser, removeUser, saveWishlist, saveCheckOutCart, saveTokenExpiration, saveUnavailableProduct } from "../reducers/userSlice";
import axios from '../../config/axios'
import { saveProduct } from "../reducers/productSlice";
import { saveOrders } from "../reducers/adminSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

export const asyncCurrentUser = () => async (dispatch, getState) => {
    try {
        // Retrieve token and token expiration time from localStorage
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        // Check if token is expired or not available
        if (!token || tokenExpiration < Date.now()) {
            // If token is not found or expired, dispatch an action to clear the current user
            dispatch(saveUser(null));
            return;
        }

        // Make a request to fetch the current user using the token
        const response = await axios.post('/user/currentUser', null, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Dispatch action to save the current user in the Redux store
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
    }
};

export const asyncSignupUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('/user/signup', data);
        console.log(response);
        dispatch(saveUser(response.data));
        toast.success("SignUp Successfully !")
    } catch (error) {
        console.error(error);
        toast.error('Email Already exist.');
    }
};


export const asyncSignIn = (data) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user/login', data);
        const expiresInMilliseconds = response.data.expiresIn;

        // Calculate token expiration time
        const expirationTime = Date.now() + expiresInMilliseconds;

        // Save token and expiration time in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Dispatch action to save token expiration in Redux store
        await dispatch(saveTokenExpiration(expirationTime));

        // Fetch current user after successful login
        dispatch(asyncCurrentUser());

        toast.success("LoggedIn Successfully !");
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
};

export const asyncSignOut=(navigate)=>async(dispacth,getState)=>{
    try {
        const response=await axios.get('/user/logout')
        dispacth(removeUser())
        toast.success("Logout Successfully !")
        navigate('/')
    } catch (error) {
        console.log(error)

    }
}

export const asyncFetchWishlist=(id)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchWishlist/${id}`)
        dispatch(saveWishlist(response.data.data.products))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncAddToWishlist=(userId,data)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.post(`/user/addToWishlist/${userId}`,data)
        toast.success("Product Added to wishlist")
    } catch (error) {
        toast.error("Login to Continue")

    }
}

export const asyncAddToCart = (userId, data) => async (dispatch, getState) => {

    try {
        const response = await axios.post(`/user/addToCart/${userId}`, data)
        toast.success("Added to cart")
       await dispatch(saveCheckOutCart(response.data))
    } catch (error) {
        console.log(error)
        toast.error("Login to continue")

    }
}

export const asyncUpdateCart = (userId, store, productIds) => async (dispatch) => {
    try {
        const response = await axios.post('/user/updateCart/', {
            userId,
            store,
            productIds
        });

        if (response.status === 200) {
            const { data } = response;
            if (data.success) {
                toast.success('Cart updated successfully');
                dispatch(saveUnavailableProduct([])); // Clear unavailable products if the cart is updated successfully
            } else {
                if (data.unavailableProducts) {
                    const unavailableProductNames = data.unavailableProducts.map(product => product.name).join(', ');
                    toast.error(`The following products are not available in the selected store: ${unavailableProductNames}`);
                } else {
                    toast.error(data.message || 'Failed to update the cart');
                }
            }

            // Dispatch action to save unavailable products to Redux store
            if (data.unavailableProducts) {
                dispatch(saveUnavailableProduct(data.unavailableProducts));
            }
        }
    } catch (error) {
        console.error('Error updating cart:', error);

        if (error.response) {
            const { data } = error.response;
            if (data.unavailableProducts) {
                const unavailableProductNames = data.unavailableProducts.map(product => product.name).join(', ');
                toast.error(`The following products are not available in the selected store: ${unavailableProductNames}`);
                // Dispatch action to save unavailable products to Redux store
                dispatch(saveUnavailableProduct(data.unavailableProducts));
            } else {
                toast.error(data.message || 'Error updating cart');
            }
        } else {
            toast.error('Error updating cart');
        }
    }
}


export const asyncDeleteFromWishlist = (userId, productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/user/deleteFromWishlist/${userId}/${productId}`)
        toast.success("Product Deleted")
        dispatch(asyncFetchWishlist(userId))
    } catch (error) {
        toast.error(error.response.data.message)

    }
}


export const asyncFetchCartProduct=(userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/fetchCart/${userId}`)
        console.log(response)
        dispatch(saveCheckOutCart(response.data.cart))
    } catch (error) {
        toast.error(error.response.data.message)
    }
}


export const asyncSendForgetLink=(email)=>async(dispatch,getState)=>{
    try {
        const response = await axios.post('/user/send-mail',email)
        toast.success("Reset mail sent")
    } catch (error) {
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
        toast.error("Address Error")

    }
}

export const asyncDeleteAddress =(index,userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.delete(`/user/deleteAddress/${userId}/${index}`)
        toast.warn("Address Deleted")
        dispatch(asyncCurrentUser(userId))
    } catch (error) {
        toast.error("Error deleting address")

    }
}

export const asyncUpdateUser=(data,userId)=>async(dispatch,getState)=>{
    try {
        const response = await axios.post(`/user/update/${userId}`,data)
        toast.success("Updated successfully")

        await dispatch(asyncCurrentUser(userId))
    } catch (error) {
        toast.error("Error updating information")

    }
}


export const asyncDeleteAccount = (userId) => async (dispatch, getState) => {
    try {
            const response = await axios.delete(`/user/deleteAccount/${userId}`)
        toast.warn("Account deleted successfully")

        await dispatch(removeUser())
    } catch (error) {
        toast.error("Error deleting account")

    }
}

export const asyncCustomerOrder = (data, userId, pdfBlob) => async (dispatch, getState) => {
    try {
        // Create FormData to handle file uploads and JSON data
        const formData = new FormData();
        console.log(data);

        // Append data to FormData
        formData.append('checkOutCart', JSON.stringify(data.checkOutCart));
        formData.append('totalGrandPrice', data.totalGrandPrice);
        formData.append('paymentType', data.paymentType);
        formData.append('pdfFile', pdfBlob, 'checkout_bill.pdf');
        formData.append('email', data.email);

        console.log(formData);

        // Send POST request with FormData
        const response = await axios.post(`/user/order/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: 'ORDER_SUCCESS',
                payload: response.data,
            });
            toast.success('Order placed successfully');
        } else {
            toast.error(response.data.message || 'Failed to place order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Failed to place order. Please try again.');
    }
};


export const asyncFetchCustomerOrder=(userId)=>async(dispatch,getState)=>{
    try {
        const resposne = await axios.get(`/user/fetchOrders/${userId}`)
        dispatch(saveOrders(resposne.data))
    } catch (error) {
        toast.error("Error fetching order")
    }
}

export const asyncUpdateStock = (productId, newStock,store,userId)=>async(dispatch,getState)=>{
    try {
        console.log(productId,newStock,store)
        const response = await axios.post(`/products/updateProductStock/${productId}`, { newStock,store })
        console.log(response)
        dispatch(asyncFetchCartProduct(userId))
    } catch (error) {
     console.log(error)   
    }
}

export const asyncReturnRequest = (orderId,userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post(`/user/order/returnRequest/${orderId}`)
        await dispatch(asyncFetchCustomerOrder(userId))
        toast.success("Return Requested")

    } catch (error) {
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

export const asyncSetPreferredStore=(selectedStore,userId)=>async(dispatch,getState)=>{
    try {
        console.log(selectedStore)
        const response=await axios.post(`/user/selectStore/${userId}/`,selectedStore)
        dispatch(asyncCurrentUser(userId))

    } catch (error) {
        toast.error("Error Setting the store")
    }
}

export const asyncSelectAddressIndex=(id,index)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post(`/user/${id}/setAddressIndex`,index)
        dispatch(asyncCurrentUser())
    } catch (error) {
        toast.error("Unabler to set address")
    }
}

export const asyncPayment = (userId, data) => async (dispatch, getState) => {
    try {
        console.log(data); // Log the userId to the console
        const response = await axios.post(`/user/${userId}/paymentInitialisation`, data);
        console.log(response)
    } catch (error) {
        console.log(error); // Log any errors that occur during the POST request
    }
};
