import {axiosPost} from "../config/axiosIstance";
import {UserInterface} from "@Interfaces/User.interface";

class UserService {

    async fetchMe(): Promise<UserInterface> {
        return await axiosPost<UserInterface>("/user/fetchme")
            .then((response) => response.data);
    }
}

export default new UserService();