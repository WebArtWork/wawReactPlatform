import {useStorage} from "./useStorage";

interface IUser {
    _id: string,
    thumb: string,
    is: { admin: boolean },
    email: string,
    reg_email: string,
    password: string,
    data: object
}

export const useGuard = () => {
    const [user, setUser] = useStorage<IUser | null>('user', null)
    if (user == null) {
        return null
    }

    if(!user) {
        return null
    }

    return user.is.admin;
}
