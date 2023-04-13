import {axiosPost,} from "../config/axiosIstance";
import {UserInterface} from "@Interfaces/User.interface";
import {string} from "prop-types";

type UserStatus = {
    email: boolean,
    pass: boolean,
}

class AuthService {
    async login(email: string, password: string) {
        return await axiosPost<UserInterface & { token: string }>(
            "/user/login",
            {
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async register(email: string, password: string) {
        return await axiosPost<UserInterface & { token: string }>(
            "/user/sign",
            {
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async status(email: string, password: string) {
        return await axiosPost<UserStatus>(
            "/user/status",
            {
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async changePassword(oldPass: string, newPass: string) {
        return await axiosPost(
            "/user/changePassword",
            {
                data: {oldPass, newPass},
            }
        ).then((response) => response.data);
    }

}

export default new AuthService();