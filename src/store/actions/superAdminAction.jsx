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
        console.log(response);
        await dispatch(saveUser(response.data.superAdmin));
    } catch (error) {
        console.error(error);
    }
};

export const asyncSuperAdminSignUp = (data) => async (dispatch, getState) => {
    try {
        console.log(data)
        const response = await axios.post('/superadmin/signup', data)
        dispatch(saveUser(response.data))
        toast.success("Signup sucessfully")

    } catch (error) {
        console.log(error)
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


export const fetchProductsByStore = (store) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/superadmin/fetchProductStore/${store}`)
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
        const response = await axios.get(`/superadmin/fetchAllUsers?page=${currentPage}`);
        dispatch(saveAllUsers(response.data.users));
    } catch (error) {
        console.log(error);
    }
};


export const asyncSuperAdminDeleteUser = (userId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/superadmin/deleteUser/${userId}`)
        toast.success("User Deleted")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
        toast.success("Error deleting user")

    }
}

export const asyncFetchActiveUser = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchLastHourActiveUsers?page=${page}`);
        console.log(response)

        dispatch(saveAllUsers(response.data.activeUsers));
    } catch (error) {
        console.log(error);
    }
};


export const asyncFetchInactiveUsers = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchInactiveUsers?page=${page}`);
        console.log(response)
        dispatch(saveAllUsers(response.data.inactiveUsers));
    } catch (error) {
        console.log(error);
    }
}

export const asyncFetchOutOfStock = (page = 1) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/superadmin/fetchOutOfStock?page=${page}`)
        console.log(response)
        dispatch(saveStoreProducts(response.data.outOfStockProducts))
    } catch (error) {
        toast.error(error)
        console.log(error)
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



export const fetchDashBoardInfo = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('/superadmin/dashboard/fetchAllInfo')
        console.log(response.data.data)
        dispatch(saveDashBoardInfo(response.data.data))

    } catch (error) {
        console.log(error)
    }
}

export const asyncSuperAdminBlockUser = (userId) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/superadmin/blockUser/${userId}`)
        console.log(response)
        toast.warn("User Blocked")

        dispatch(asyncfetchAllusers())
    } catch (error) {
        console.log(error)
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
        console.log(response);
        dispatch(saveProduct(response.data.data));
        dispatch(setLoading(false)); // Set loading state to false after successfully fetching data
    } catch (error) {
        console.error(error);
        dispatch(setLoading(false)); // Set loading state to false if an error occurs
    }
};

