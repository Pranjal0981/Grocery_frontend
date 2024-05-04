import axios from '../../config/axios'
import { saveStoreProducts, saveAllUsers, saveOrders, setLoading } from '../reducers/superAdminSlice';
import { saveProduct } from '../reducers/productSlice';
import { saveUser, removeUser } from '../reducers/userSlice'
import { saveDashBoardInfo } from '../reducers/superAdminSlice';
import { toast } from 'react-toastify';
export const asyncCurrentSuperAdmin = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/superadmin/currentsuperAdmin', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await dispatch(saveUser(response.data.superAdmin));
    } catch (error) {
        toast.error(error.response.data.message)
    }
};

export const asyncSuperAdminSignUp = (data) => async (dispatch, getState) => {
    try {
        console.log(data)
        const response = await axios.post('/superadmin/signup', data)
        dispatch(saveUser(response.data))
        toast.success("Signup sucessfully")

    } catch (error) {
       toast.error(error.response.data.message)
    }
}

export const asyncSuperAdminSignIn = (data, navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/superadmin/login', data);
        await dispatch(asyncCurrentSuperAdmin(res.data.token));
        toast.success("LoggedIn sucessfully")

    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }

};

export const asyncSignOutSuperAdmin = (navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.get('/superadmin/logout');
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

export const fetchProductsByStore = (store) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/superadmin/fetchProductStore/${store}`)
        dispatch(saveStoreProducts(response.data.products))
    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally {
        dispatch(setLoading(false));
    }
}

export const asyncfetchAllusers = (currentPage) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchAllUsers?page=${currentPage}`);
        dispatch(saveAllUsers(response.data.users));
    } catch (error) {
        toast.error(error.response.data.message)
    }
};

export const asyncSuperAdminDeleteUser = (userId,page=1) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/superadmin/deleteUser/${userId}`)
        toast.success("User Deleted")
        console.log(response)
        dispatch(saveAllUsers(response.data.users))
    } catch (error) {
        console.log(error)
        toast.success("Error deleting user")

    }
}

export const asyncFetchActiveUser = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchLastHourActiveUsers?page=${page}`);
        dispatch(saveAllUsers(response.data.activeUsers));
    } catch (error) {
        toast.error(error.response.data.message)
    }
};

export const asyncFetchInactiveUsers = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchInactiveUsers?page=${page}`);
        dispatch(saveAllUsers(response.data.inactiveUsers));
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncFetchOutOfStock = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchOutOfStock?page=${page}`)
        dispatch(saveStoreProducts(response.data.outOfStockProducts))
    } catch (error) {
        toast.error(error)
        toast.error(error.response.data.message)
    }
}

export const asyncDelProduct = (productId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/admin/deleteProducts/${productId}`);
        toast.success(error.response.data.message)
        dispatch(asyncFetchAllProducts())
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const fetchDashBoardInfo = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('/superadmin/dashboard/fetchAllInfo')
        console.log(response)
        dispatch(saveDashBoardInfo(response.data.data))

    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncSuperAdminBlockUser = (userId) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/superadmin/blockUser/${userId}`)
        toast.warn("User Blocked")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const asyncSuperAdminUnblockUser = (userID) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/superadmin/unblockUser/${userID}`)
        console.log(response)
        toast.warn("User Unblocked")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
        toast.error("Error in unblocking user")

    }
}

export const asyncFetchAllProducts = (page, searchTerm = '', searchType = '') => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true)); // Set loading state to true before fetching data

        const response = await axios.get(`/superadmin/getallproduct?page=${page}&q=${searchTerm}&type=${searchType}`);
        dispatch(saveProduct(response.data.data));
        dispatch(setLoading(false)); // Set loading state to false after successfully fetching data
    } catch (error) {
        console.error(error);
        dispatch(setLoading(false)); // Set loading state to false if an error occurs
    }
};


export const asyncSuperAdminSendForgetLink = (email) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/superadmin/send-mail', email)
        toast.success("Reset mail sent")
    } catch (error) {
        toast.error("Error sending mail")


    }
}

export const asyncSuperAdminResetPassword = (id, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/superadmin/forget-link/${id}`, { password }); // Pass password as an object
        toast.success("Password Reset Successfully")
    } catch (error) {
        toast.error("Error reseting password")

    }
};