import axios from '../../config/axios';
import { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading } from '../reducers/adminSlice';
import { saveProduct } from '../reducers/productSlice';
import { saveUser, removeUser, saveTokenExpiration } from '../reducers/userSlice';
import { toast } from 'react-toastify';

// Declaring localStorage globally
const token = localStorage.getItem('token');

export const asyncCurrentManager = () => async (dispatch, getState) => {
    try {
        const response = await axios.post('/storemanager/currentStoreManager', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        await dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
    }
};

export const asyncStoreRegister = (data) => async (dispatch, getState) => {
    try {
        console.log(data);
        const response = await axios.post('/storemanager/register', data);
        console.log(response);
        toast.success("Signup Successful");
    } catch (error) {
        console.log(error);
        toast.error("Signup Error");
    }
};

export const asyncStoreLogin = (data, navigate) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/storemanager/login', data);
        const token = response.data.token;
        const expiresInMilliseconds = response.data.expiresIn;

        const expirationTime = Date.now() + expiresInMilliseconds;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationTime);

        await dispatch(saveTokenExpiration(expirationTime));
        await dispatch(asyncCurrentManager());
        toast.success("Login Successful");
        console.log(store);
        navigate(`/store/allorders/${data.store}`);
    } catch (error) {
        console.log(error);
        toast.error("Login Error");
    }
};

export const asyncStoreLogout = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/storemanager/logoutStore', {
            headers: { Authorization: `Bearer ${token}` }
        });
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
};

export const asyncStoreManagerPassword = (id, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/storemanager/forget-link/${id}`, { password }, {
            headers: { Authorization: `Bearer ${token}` }
        }); // Pass password as an object
        toast.success("Password Reset Successfully");
    } catch (error) {
        toast.error("Error resetting password");
    }
};

export const asyncSendForgetLinkStoremanager = (email) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/storemanager/send-mail', email, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Reset Link Sent");
    } catch (error) {
        console.log(error);
        toast.error("Error Sending Link");
    }
};

export const asyncFetchAllProducts = (store, page = 1, searchQuery = '') => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/storemanager/getAllProducts/${store}`, {
            params: {
                page,
                search: searchQuery
            },
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        const { products, totalPages } = response.data; // Destructure products and totalPages from response.data
        await dispatch(saveStoreProducts({ products, totalPages }));
    } catch (error) {
        console.log(error);
    }
};
