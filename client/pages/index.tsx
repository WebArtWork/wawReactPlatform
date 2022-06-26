import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'

import { setUser } from "Redux/userSlice";
import { getMe } from '@Api/auth';
import { wrapper } from "Redux/store";
import { parseCookies } from "nookies";

import LoginPage from "Components/Views/LoginPage";

const Login: NextPage = () => {
    return (
        <LoginPage />
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const { authToken } = parseCookies(ctx);
    if (authToken) {
        const user = await getMe(authToken);
        await store.dispatch(setUser(user));
        return {
            redirect: {
                permanent: false,
                destination: `/profile`
            }
        }
    }

    return {
        props: {}
    }
})

export default Login;
