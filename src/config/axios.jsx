import axios from "axios";
const instance = axios.create(

    {
        baseURL: "https://grocery-backend-w10l.onrender.comu",
        withCredentials: true,

    });

export default instance;