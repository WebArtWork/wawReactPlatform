import {GetServerSideProps} from "next";
import React, {useState} from 'react'
import {useRouter} from "next/router";
import {parseCookies} from "nookies";

import {wrapper} from "Redux/store";
import {getMe} from "@Api/auth";
import {setUser} from "Redux/userSlice";
import {fetchUsers} from "@Api/user";

import {IUser} from "Types/IUser";
import Layout from "Components/Layout";
import UsersPage from "Components/Views/Admin/UsersPage";


interface UsersPageProps {
    userList: IUser[]
}

const Users = ({userList}: UsersPageProps) => {
    const [inputError, setInputError]: any = useState(false);
    const router = useRouter()
    const [emailInput, setEmailInput] = useState('');
    const [users, setUsers] = useState<any>([]);
    
    return (
        <Layout>
            <UsersPage userList={userList}/>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store =>  async (ctx) => {
    const {authToken} = parseCookies(ctx);
    if(!authToken) {
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        }
    }

    const user = await getMe(authToken);
    await store.dispatch(setUser(user));

    if(!user.is.admin){
        return {
            redirect: {
                permanent: false,
                destination: `/profile`
            }
        }
    }

    const userList = await fetchUsers(authToken);

    return {
        props: {
            userList
        }
    }
})

export default Users;
