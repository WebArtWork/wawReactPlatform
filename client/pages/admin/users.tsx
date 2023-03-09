import React from 'react'
import {NextPageWithAuth} from "@Interfaces/app/NextPageWithProps";
import {NextPage} from "next";
import {WithAuth} from "@Hocs/withAuth";


const Users: NextPage & NextPageWithAuth = () => {
    return (
        <></>
    );
}

Users.auth = true;

export default WithAuth(Users)
