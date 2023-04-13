import React from 'react'
import {GetServerSidePropsContext, NextPage} from "next";
import {withAuth} from "@Hocs/withAuth";


const Users: NextPage & {role: string} = () => {
    return (
        <></>
    );
}

Users.role = 'admin';

export const getServerSideProps = withAuth(async (ctx: GetServerSidePropsContext) => {
    return {
        props: {}
    }
})

export default Users
