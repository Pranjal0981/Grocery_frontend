import axios from "axios";
const instance = axios.create(

    {
        baseURL: "https://rgsgrocerybackend.rgsgrocery.com/",
        withCredentials: true,

    });

export default instance;