import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials=true
// axiosInstance.defaults.baseURL='https://e-commerce-backend-2-o.onrender.com' 
axiosInstance.defaults.baseURL='http://localhost:8080'

export default axiosInstance;