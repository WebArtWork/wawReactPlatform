import axios, {AxiosInstance, AxiosResponse} from "axios";
import {parseCookies} from "nookies";
import getConfig from "next/config";


const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();


const axiosOptions = {
    baseURL: serverRuntimeConfig.apiURL === undefined ? publicRuntimeConfig.apiURL : serverRuntimeConfig.apiURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
};
export const axiosInstance: AxiosInstance = axios.create(axiosOptions);

export const axiosPost = <T>(
    url = "",
    {
        data = {},
        headers = {},
    } = {}
): Promise<AxiosResponse<T>> => {

    // console.log('current url', serverRuntimeConfig.apiURL === undefined ? publicRuntimeConfig.apiURL : serverRuntimeConfig.apiURL)

    return axiosInstance.post<T>(url, data, {
        headers,
    });
}

export const axiosGet = <T>(
    url = "",
    {
        params = {},
        headers = {},
    } = {}
): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, {
        params,
        headers,
    });
}

export const axiosPut = <T>(
    url = "",
    {
        data = {},
        headers = {},
    } = {}
): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, {
        headers,
    })
}
export const axiosPatch = <T>(
    url = "",
    {
        data = {},
        headers = {},
    } = {}
): Promise<AxiosResponse<T>> => {
    return axiosInstance.patch<T>(url, data, {
        headers,
    })
}

export const axiosDelete = <T>(
    url = "",
    {
        data = {},
    } = {}
): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, data);
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aHVtYiI6Ii9hc3NldHMvZGVmYXVsdC5wbmciLCJfaWQiOiI2NDBhNDQ1ZWRmOWUwNzNkMzhjM2ZiZmEiLCJpcyI6eyJhZG1pbiI6dHJ1ZX0sImVtYWlsIjoiY2VvQHdlYmFydC53b3JrIiwicmVnX2VtYWlsIjoiY2VvQHdlYmFydC53b3JrIiwiZGF0YSI6e30sIl9fdiI6MCwianRpIjoiY2U3ODE3ZDMtNmVmNi00MjNiLWI0YzYtNjVhZTQ4ZTdiNDdmIiwiaWF0IjoxNjc4OTMwOTAzLCJleHAiOjE2NzkxMDM3MDN9.gUvc29mPv4BUGHB20e9Cy9OQlCn2wIxXHoScC-opI14"
        // console.log(cookies)
        config.headers = {...config.headers}
        if (token) {
            config.headers['token'] = token;
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
    if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const {token} = parseCookies(null);
        axios.defaults.headers.common['token'] = token;
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
});