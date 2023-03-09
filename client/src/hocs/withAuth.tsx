import React from 'react';
import {NextPage} from "next";
import {NextPageWithAuth} from "@Interfaces/app/NextPageWithProps";
import {useTypedSelector} from "@Hooks/useTypedSelector";

export const WithAuth = (Page: NextPage & NextPageWithAuth) => {
    const user = useTypedSelector(state => state.user);
    console.log(user)

    const withAuth: (props: any) => JSX.Element = (props) => {
        return (
            <Page {...props} />
        );
    };

    return withAuth;
};