import axios from "axios";

const instance = axios.create({
    baseURL: "/api/user/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    }
});

export const authLogin = async (email: string, password: string) => {
    return await instance.post('login', {email, password})
        .then(response => response.data);
}

export const authSign = async (email: string, password: string) => {
    return await instance.post('sign', {email, password})
        .then(response => response.data);
}

export const authStatus = async (email: string) => {
    return await instance.post('status', {email})
        .then(response => response.data)
}

export const getMe = async (token: string) => {
    return axios.post('http://localhost:8080/api/user/fetchme', {},
        {
            headers: {
                token: token,
            }
        })
        .then(response => response.data);
}

