import { saveUser, removeUser, saveWishlist, saveCheckOutCart, saveTokenExpiration, saveUnavailableProduct, setCashOnDeliveryProcessing } from "../reducers/userSlice";
import axios from '../../config/axios'
import { saveProduct } from "../reducers/productSlice";
import { saveOrders } from "../reducers/adminSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

export const asyncCurrentUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        if (!token || tokenExpiration < Date.now()) {
            dispatch(saveUser(null));
            return;
        }

        const response = await axios.post('/user/currentUser', null, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
        dispatch(saveUser(null));
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

export const asyncSignIn = (data) => async (dispatch) => {
    try {
        const response = await axios.post('/user/login', data);
        const token = response.data.token;
        const expiresInMilliseconds = response.data.expiresIn;

        const expirationTime = Date.now() + expiresInMilliseconds;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationTime);

        await dispatch(saveTokenExpiration(expirationTime));
        dispatch(asyncCurrentUser());

        toast.success("Logged in successfully!");
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

export const asyncFetchWishlist = (id) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.get(`/user/fetchWishlist/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(saveWishlist(response.data.data.products));
    } catch (error) {
        toast.error(error.response.data.message);
    }
};


export const asyncAddToWishlist = (userId, data) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const response = await axios.post(`/user/addToWishlist/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)

        // dispatch(wishlistProductAdded());
        toast.success("Product Added to wishlist");
    } catch (error) {
        console.log(error)
        toast.error("Login to Continue");
    }
};

export const asyncAddToCart = (userId, data) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post(`/user/addToCart/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success("Added to cart");
        await dispatch(saveCheckOutCart(response.data));
    } catch (error) {
        console.error(error);
        toast.error("Login to continue");
    }
};


export const asyncUpdateCart = (userId, store, productIds) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post('/user/updateCart/', {
            userId,
            store,
            productIds
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.delete(`/user/deleteFromWishlist/${userId}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("Product Deleted");
        dispatch(asyncFetchWishlist(userId));
    } catch (error) {
        toast.error(error.response.data.message);
    }
};


export const asyncFetchCartProduct = (userId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.get(`/user/fetchCart/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response);
        dispatch(saveCheckOutCart(response.data.cart));
    } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error(error.response?.data?.message || 'Error fetching cart');
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

export const asyncDeleteCheckoutCart = (userId, productId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');  // Retrieve token from local storage
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.delete(`/user/deleteFromCart/${userId}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("Product Deleted");
        dispatch(asyncFetchCartProduct(userId));
    } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(error.response?.data?.message || "Error deleting product from cart");
    }
};


export const asyncAddAddress = (data) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post('/user/addAddress', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("Address Added");
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
        toast.error("Address Error");
    }
};

export const asyncDeleteAddress = (index, userId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.delete(`/user/deleteAddress/${userId}/${index}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.warn("Address Deleted");
        dispatch(asyncCurrentUser());
    } catch (error) {
        console.error(error);
        toast.error("Error deleting address");
    }
};

export const asyncUpdateUser = (data, userId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(`/user/update/${userId}`, data, config);
        toast.success("Updated successfully");

        await dispatch(asyncCurrentUser(userId));
    } catch (error) {
        toast.error("Error updating information");
    }
};


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
        dispatch(setCashOnDeliveryProcessing(true)); // Set loading state to true for cash on delivery

        const formData = new FormData();

        // Append data to FormData
        formData.append('checkOutCart', JSON.stringify(data.checkOutCart));
        formData.append('totalGrandPrice', data.totalGrandPrice);
        formData.append('paymentType', data.paymentType);
        formData.append('orderId', data.orderId);
        formData.append('invoiceNumber', data.invoiceNumber);
        formData.append('pdfFile', pdfBlob, 'checkout_bill.pdf');
        formData.append('email', data.email);

        // Retrieve the token from the Redux store
        const  token  = localStorage.getItem("token"); // Assuming you have a slice of state for authentication that stores the token

        // Send POST request with FormData
        const response = await axios.post(`/user/order/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Add token to headers
            },
        });

        await dispatch(asyncClearCart(userId)); // Clear the cart after successful order placement

        dispatch(setCashOnDeliveryProcessing(false));
        toast.success('Order placed successfully');
    } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Failed to place order. Please try again.');
        dispatch(setCashOnDeliveryProcessing(false)); // Set loading state to false in case of error
    }
}
export const asyncClearCart = (userId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post('/user/clear-cart', { userId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(asyncFetchCartProduct(userId));
    } catch (error) {
        console.error(error);
    }
};


export const asyncFetchCustomerOrder = (userId) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.get(`/user/fetchOrders/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(saveOrders(response.data));
    } catch (error) {
        console.error(error);
        toast.error("Error fetching order");
    }
};


export const asyncUpdateStock = (productId, newStock, store, userId) => async (dispatch, getState) => {
    try {
        console.log(productId, newStock, store)
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post(`/products/updateProductStock/${productId}`, { newStock, store }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

export const asyncSetPreferredStore = (selectedStore, userId) => async (dispatch, getState) => {
    try {
        console.log(selectedStore);

        const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage

        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post(`/user/selectStore/${userId}`, selectedStore, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers
            }
        });

        dispatch(asyncCurrentUser(userId));
    } catch (error) {
        toast.error("Error Setting the store");
    }
};


export const asyncSelectAddressIndex = (id, index) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post(`/user/${id}/setAddressIndex`, { index }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(asyncCurrentUser());
    } catch (error) {
        toast.error("Unable to set address");
    }
};


export const asyncPayment = (userId, data) => async (dispatch, getState) => {
    try {
        console.log(data); // Log the userId to the console
        const response = await axios.post(`/user/${userId}/paymentInitialisation`, data);
        console.log(response)
    } catch (error) {
        console.log(error); // Log any errors that occur during the POST request
    }
};

export const asyncUpdateCartQuantity = (userId, productId, quantity) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await axios.post('/user/updateProductQuantity', { userId, productId, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(asyncFetchCartProduct(userId));
    } catch (error) {
        console.error(error);
    }
};
