import {parseCookies} from "nookies";
import axios from "axios";
import {axiosInstance} from "./axiosIstance";

axiosInstance.interceptors.request.use(
    config => {
        const {token} = parseCookies(null)

        console.log(token)

        config.headers = {
            'token': token || '',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = "asdasd";
        axios.defaults.headers.common['token'] = token;
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
});