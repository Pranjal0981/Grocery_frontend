import axios from '../../config/axios'
import { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading } from '../reducers/adminSlice';
import { saveProduct } from '../reducers/productSlice';
import { saveUser, removeUser } from '../reducers/userSlice'
export const asyncCurrentAdmin = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/admin/currentAdmin', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        await dispatch(saveUser(response.data.admin));
    } catch (error) {
        console.error(error);
    }
};

export const asyncAdminRegister=(data)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response=await axios.post('/admin/signup',data)
        console.log(response)
        dispatch(saveUser(response.data))
    } catch (error) {
        console.log(error)        
    }
}



export const asyncAdminLogin = (data, navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/admin/login', data);
        await dispatch(asyncCurrentAdmin(res.data.token));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }

};

export const asyncLogoutAdmin = (navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.get('/admin/logout');
        await dispatch(removeUser());
        toast.success('Logged out.');
        navigate('/')
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Logout Error.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
}

export const asyncFetchOrders = (page = 1,store) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchOrders/${store}?page=${page}`);
        console.log(response);
        dispatch(saveOrders(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const fetchProductsByStore = (store) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/admin/fetchProductStore/${store}`)
        console.log(response)
        dispatch(saveStoreProducts(response.data.products))
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch(setLoading(false));
    }
}


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
        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
    }
}

export const asyncFetchActiveUser = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchLastHourActiveUsers?page=${page}`);
        console.log(response)
        dispatch(saveAllUsers(response.data.activeUsers));
    } catch (error) {
        console.log(error);
    }
};


export const asyncFetchInactiveUsers = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchInactiveUsers?page=${page}`);
        console.log(response)
        dispatch(saveAllUsers(response.data.inactiveUsers));
    } catch (error) {
        console.log(error);
    }
}

export const asyncFetchOutOfStock = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/admin/fetchOutOfStock?page=${page}`)
        console.log(response)
        dispatch(saveStoreProducts(response.data.outOfStockProducts))
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
}

export const asyncDeleteProducts = (productId, productType) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/admin/deleteProducts/${productType}/${productId}`);
        console.log(response)
        dispatch(asyncFetchOutOfStock())
    } catch (error) {
        toast.error(error)
    }
}


export const asyncDelProduct = (productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/admin/deleteProducts/${productId}`);
        console.log(response)
        dispatch(asyncFetchAllProducts())
    } catch (error) {
        toast.error(error)
    }
}

export const asyncUpdateProduct = (id, updatedProduct) => async (dispatch, getState) => {
    try {
        const response = await axios.put(`/admin/updateProduct/${id}`, {updatedProduct});
        console.log(response.data);
        toast.success('Product updated successfully', {
            position: "top-right"
        });
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
        console.log(response)
        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
    }
}



export const asyncAdminUnblockUser = (userID) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/admin/unblockUser/${userID}`)
        console.log(response)
        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
    }
}


export const asyncFetchAllProducts = (page, searchTerm = '', searchType = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true)); // Set loading state to true before fetching data

        const response = await axios.get(`/admin/getallproduct?page=${page}&q=${searchTerm}&type=${searchType}`);
        console.log(response);
        dispatch(saveProduct(response.data.data));
        dispatch(setLoading(false)); // Set loading state to false after successfully fetching data
    } catch (error) {
        console.error(error);
        dispatch(setLoading(false)); // Set loading state to false if an error occurs
    }
};

export const asyncUploadProducts = (formData) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/admin/upload-products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
            }
        });
        console.log(response)
    } catch (error) {
        // Handle error
        console.error('Error uploading products:', error);
    }
};