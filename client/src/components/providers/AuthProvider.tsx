import {createContext} from "vm";
import {UserInterface} from "@Interfaces/User.interface";
import {FC, PropsWithChildren, useState} from "react";
import {TypeComponentAuthField} from "@Interfaces/app/NextPageWithProps";
import {useAppDispatch} from "@Hooks/useAppDispatch";
import {useAppSelector} from "@Hooks/useTypedSelector";
import {fetchUser} from "@Redux/userSlice";

export type TypeUser = UserInterface | null;

export interface AuthContextType {
    user: TypeUser;
    setUser: (user: UserInterface) => void;
}

export const AuthContext = createContext({
    user: null,
    setUser: (user: UserInterface) => {}
} as AuthContextType);

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({children, Component:{withAuth, withAdmin}}) => {
    const [user, setUser] = useState<TypeUser>(null);
    const userFromStore = useAppSelector<UserInterface>( state => state.user);

    const dispatch = useAppDispatch();

    // console.log('AuthProvider', userFromStore)

    if(!user && userFromStore) {
        dispatch(fetchUser());
    }


    if(withAuth && !user) {
        return <div>Auth</div>
    }

    if(withAdmin && !user?.is?.admin) {
        return <div>Admin</div>
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;