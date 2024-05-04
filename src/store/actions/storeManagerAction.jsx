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
    } catch (error) {
        console.log(error)
    }
}

export const asyncStoreLogin=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/storemanager/login',data)
        await dispatch(asyncCurrentManager(response.data.token))
    } catch (error) {
        console.log(error)
    }
}

 

