import axios from "axios";
const instance = axios.create(

    {
        baseURL: 'https://grocery-backend-w10l.onrender.com',
        withCredentials: true,

    });

export default instance;