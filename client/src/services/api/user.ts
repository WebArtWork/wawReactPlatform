import axios from "axios";
import {IUser} from "Types/IUser";

const instance = axios.create({
    baseURL: "/api/user",
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    }
});

export const fetchUsers = async (token: string) => {
    return await instance.get('http://localhost:8080/api/user/get', {
        headers: {
            token: token
        }
    }).then(response => response.data);
}

export const update = async (user: IUser, userData: any, token: string) => {
    return await instance.post('/update', {
        _id: user._id,
        data: userData
    },{
        headers: {
            token: token
        }
    }).then(response => response.data);
}

export const createUser = async (email: string, token: string) => {
    return await instance.post('/create', {
        email
    }, {
        headers: {
            token: token
        }
    })
        .then(response => response.data);
}

export const setIs = async (user: IUser, token: string) => {
    return await instance.post('/updateadmin', {
        _id: user._id,
        user,
        is: user.is,
        data: user.data
    },{
        headers: {
            token: token
        }
    }).then(response => console.log(response.data));
}

export const deleteUser = async (user: IUser, token: string) => {
    return await instance.post('/deleteadmin', {
        _id: user._id,
        user
    }, {
        headers: {
            token: token
        }
    })
        .then(response => response.data)
}
