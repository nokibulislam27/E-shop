import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    // const { logOutUser } = useAuth();
    // Interceptor for requests
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // Interceptor for responses
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                // await logout();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;