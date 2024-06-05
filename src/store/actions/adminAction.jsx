import axios from '../../config/axios'
import { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading, saveOutOfstock } from '../reducers/adminSlice';
import { saveProduct, saveStoreStocks } from '../reducers/productSlice';
import { saveUser, removeUser, saveTokenExpiration } from '../reducers/userSlice'
import { toast } from 'react-toastify';
import { asyncExploreById } from './productAction';

export const asyncCurrentAdmin = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/admin/currentAdmin', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        await dispatch(saveUser(response.data.admin));
    } catch (error) {
        console.error(error);
    }
};

export const asyncAdminRegister=(data)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response=await axios.post('/admin/signup',data)
        toast.success("Admin Signup Successfully")

        dispatch(saveUser(response.data))
    } catch (error) {
        toast.error("Error in admin signup")


    }
}

export const asyncAdminLogin = (data, navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/admin/login', data);
        console.log(res.data);

        // Dispatch action to handle current admin login
        await dispatch(asyncCurrentAdmin(res.data.token));

        // Access the expiresIn value from the response
        const expiresInMilliseconds = res.data.expiresIn;

        // Calculate the token expiration time in milliseconds from the current time
        const expirationTime = Date.now() + expiresInMilliseconds;

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Dispatch action to save token expiration in Redux store
        dispatch(saveTokenExpiration(expirationTime));
        // Show success toast
        toast.success("Admin Signin Successfully");

        // Navigate to the desired page
        navigate('/admin/upload-products');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
};


export const asyncLogoutAdmin = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/admin/logout');
        await dispatch(removeUser());
        toast.success('Logged out.');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Logout Error.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
}

export const asyncFetchOrders = (page, store) => async (dispatch, getState) => {
    try {
        let response;
        if (store) {
            response = await axios.get(`/admin/fetchOrders/${store}?page=${page}`);
        } else {
            response = await axios.get(`/admin/fetchOrders?page=${page}`);
        }
        dispatch(saveOrders(response.data.data));
    } catch (error) {
        console.log(error);
    }
};


export const fetchProductsByStore = (store, page, searchQuery = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/admin/fetchProductStore/${store}?page=${page}&search=${searchQuery}`);
        const { products, totalPages } = response.data; // Destructure products and totalPages from response.data
        dispatch(saveStoreProducts({ products, totalPages }));
        console.log(response)

    } catch (error) {
        console.log(error);
    }
    finally {
        dispatch(setLoading(false));
    }
};


export const asyncfetchAllusers = (currentPage) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchAllUsers?page=${currentPage}`);
        dispatch(saveAllUsers(response.data.users));
    } catch (error) {
        console.log(error);
    }
};

export const asyncAdminDeleteUser = (userId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/admin/deleteUser/${userId}`)
        toast.success("User deleted")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
        toast.error("Error deleting user")

    }
}

export const asyncFetchActiveUser = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchLastHourActiveUsers?page=${page}`);
        dispatch(saveAllUsers(response.data.activeUsers));
    } catch (error) {
        console.log(error);
    }
};

export const asyncFetchInactiveUsers = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchInactiveUsers?page=${page}`);
        dispatch(saveAllUsers(response.data.inactiveUsers));
    } catch (error) {
        console.log(error);
    }
}

export const asyncFetchOutOfStock = (page) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchOutOfStock?page=${page}`)
        const {outOfStockProducts,totalPages}=response.data
        dispatch(saveOutOfstock({outOfStockProducts,totalPages}))
        console.log(response)
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
}

export const asyncDelProduct = (productId,store,currentPage,searchQuery) => async (dispatch, getState) => {
    try {
        console.log(currentPage)
        const response = await axios.delete(`/admin/deleteProducts/${store}/${productId}`);
        toast.warn('Product Deleted')
        dispatch(fetchProductsByStore(store,currentPage,searchQuery))
    } catch (error) {
        toast.error(error)
    }
}

export const asyncUpdateProduct = (id, formData) => async (dispatch, getState) => {
    try {
        console.log(formData)
        const response = await axios.put(`/admin/updateProduct/${id}`, formData);
        console.log(response.data);
        toast.success('Product updated successfully', {
            position: "top-right"
        });
        await dispatch(asyncExploreById(id))
    } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Error updating product. Please try again.', {
            position: "top-right"
        });

        // Handle error if needed
    }
};


export const updateOrderStatus = (orderId, newStatus,store) => async (dispatch, getState) => {
    try {
        const response = await axios.put('/admin/order/updateStatus', { orderId, newStatus });
        dispatch(asyncFetchOrders({},store))
    } catch (error) {
        console.log(error);

    }
};

export const fetchDashBoardInfo = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('/admin/dashboard/fetchAllInfo')
        console.log(response.data.data)
        dispatch(saveDashBoardInfo(response.data.data))

    } catch (error) {
        console.log(error)
    }
}

export const asyncAdminBlockUser = (userId) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/admin/blockUser/${userId}`)
        toast.warn("User blocked")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
        toast.error("User blocked")

    }
}

export const asyncAdminUnblockUser = (userID) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/admin/unblockUser/${userID}`)
        toast.success("User Unblocked")

        dispatch(asyncfetchAllusers())

    } catch (error) {
        console.log(error)
    }
}

export const asyncFetchAllProducts = (page, searchTerm = '', searchType = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true)); // Set loading state to true before fetching data

        const response = await axios.get(`/admin/getallproduct?page=${page}&q=${searchTerm}&type=${searchType}`);
        dispatch(saveProduct(response.data.data));
        dispatch(setLoading(false)); // Set loading state to false after successfully fetching data
    } catch (error) {
        console.error(error);
        dispatch(setLoading(false)); // Set loading state to false if an error occurs
    }
};

export const asyncUploadProducts = (formData) => async (dispatch, getState) => {
    try {
        console.log(formData)
        const response = await axios.post('/admin/upload-products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
            }
        });
        toast.success("Product Uploaded ")

    } catch (error) {
        // Handle error
        console.error('Error uploading products:', error);
    }
};

export const asyncAdminSendForgetLink = (email) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/admin/send-mail', email)
        toast.success("Reset mail sent")
    } catch (error) {
        toast.error("Error sending mail")

    }
}

export const asyncAdminResetPassword = (id, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/admin/forget-link/${id}`, { password }); // Pass password as an object
        toast.success("Password Reset Successfully")
    } catch (error) {
        toast.error("Error reseting password")

    }
};