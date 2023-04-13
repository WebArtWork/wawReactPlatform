import React from "react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {wrapper} from "@Redux/store";
import {parseCookies} from "nookies";
import {fetchUser} from "@Redux/userSlice";

// export const withAuth = (
//     getServerSidePropsFn: (
//         context: GetServerSidePropsContext,
//     ) => Promise<{ props: any }>
// ): GetServerSideProps => {
//     return wrapper.getServerSideProps((store) => async (ctx) => {
//         const {token} = parseCookies(ctx);
//         if (!token) {
//             return {
//                 redirect: {
//                     destination: '/',
//                     permanent: false,
//                 },
//             };
//         }
//
//         store.dispatch(fetchUser());
//
//
//         const {props} = await getServerSidePropsFn(ctx);
//         return {
//             props: {
//                 ...props
//             }
//         };
//     });
// };


const withUser = (C: React.FC) => {
    console.log('withUser', C)


    return () => {
        return <C />
    }
}