import axios from '../../config/axios'
import { saveStoreProducts, saveAllUsers, saveOrders, saveDashBoardInfo, setLoading } from '../reducers/adminSlice';
import { saveProduct } from '../reducers/productSlice';
import { saveUser, removeUser } from '../reducers/userSlice'
import { toast } from 'react-toastify';

export const asyncStoreRegister=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/storemanager/register',data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export const asyncStoreLogin=(data)=>async(dispatch,getState)=>{
    try {
        const response=await axios.post('/storemanager/login',data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}