import axios from "axios";

const axiosOptions = {
    baseURL: "/api",
};
export const axiosInstance = axios.create(axiosOptions);

export const axiosApiPost = (
    {
        url = "",
        data = {},
        headers = {},
    }
) => {
    return axiosInstance.post(url, data, {
        headers,
    });
}

export const axiosApiGet = (
    {
        url = "",
        params = {},
        headers = {},
    }
) => {
    return axiosInstance.get(url, {
        params,
        headers,
    });
}

export const axiosApiPut = (
    {
        url = "",
        data = {},
        headers = {},
    }
) => {
    return axiosInstance.put(url, data, {
        headers,
    })
}

export const axiosApiDelete = (
    {
        url = "",
        data = {},
    }
) => {
    return axiosInstance.delete(url, data);
}