import {axiosApiGet, axiosApiPost, axiosInstance} from "../config/axiosIstance";

class AuthService {
    async login(email: string, password: string) {
        return await axiosApiPost(
            {
                url: "/user/login",
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async register(email: string, password: string) {
        return await axiosApiPost(
            {
                url: "/user/sign",
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async status(email: string, password: string) {
        return await axiosApiPost(
            {
                url: "/user/status",
                data: {email, password},
            }
        ).then((response) => response.data);
    }

    async fetchMe() {
        return await axiosApiGet(
            {
                url: "/user/fetchme"
            }
        ).then((response) => response.data);
    }

    async changePassword(oldPass: string, newPass: string) {
        return await axiosApiPost(
            {
                url: "/user/changePassword",
                data: {oldPass, newPass},
            }
        ).then((response) => response.data);
    }

}

export default new AuthService();