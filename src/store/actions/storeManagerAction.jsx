import axios from '../../config/axios'
import { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading } from '../reducers/adminSlice';
import { saveProduct } from '../reducers/productSlice';
import { saveUser, removeUser } from '../reducers/userSlice'
import { toast } from 'react-toastify';
export const asyncCurrentManager = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/storemanager/currentStoreManager', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        await dispatch(saveUser(response.data.storemanger));
    } catch (error) {
        console.error(error);
    }
};

export const asyncStoreRegister=(data)=>async(dispatch,getState)=>{
    try {
        console.log(data)
        const response=await axios.post('/storemanager/register',data)
        console.log(response)
        toast.success("Signup Successfull")
    } catch (error) {
        console.log(error)
        toast.error("Signup Error")

    }
}

export const asyncStoreLogin=(data,navigate,store)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/storemanager/login',data)
        await dispatch(asyncCurrentManager(response.data.token))
        toast.success("Login Successfull")
        navigate(`/store/allorders/${store}`)

    } catch (error) {
        console.log(error)
        toast.success("Login Error")

    }
}


export const asyncStoreLogout = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/storemanager/logoutStore');
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
