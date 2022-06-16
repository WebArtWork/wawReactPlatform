import React from 'react'
import {parseCookies} from "nookies";
import {GetServerSideProps} from "next";

import Layout from "Components/Layout";
import ProfilePage from "Components/Views/ProfilePage";
import {wrapper} from "Redux/store";
import {getMe} from "@Api/auth";
import {setUser} from "Redux/userSlice";

export const Profile = () => {
    return (
        <Layout>
            <ProfilePage/>
        </Layout>
    );
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store =>  async (ctx) => {
    const {authToken} = parseCookies(ctx);
    if(authToken) {
        const user = await getMe(authToken);
        store.dispatch(setUser(user));

        return {
            props: {}
        }
    }
    return {
        redirect:{
            permanent: false,
            destination: `/`
        }
    }
})

export default Profile;