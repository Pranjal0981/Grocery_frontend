import { saveUser, removeUser } from "../reducers/userSlice";
import axios from "../../config/axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const asyncCurrentUser = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error(error);
    }
};