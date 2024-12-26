import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const axiosInstance = axios.create({
    baseURL: 'https://tech-sphere-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.status === 401 || error.status === 403) {
                logOutUser()
                .then(() => {
                    navigate('/login');
                })
                .catch(error => {
                    toast.error(error.code);
                })
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;