import React from 'react';
import Navbar from "Components/Navbar/Navbar";
import Head from "next/head";

interface ShopLayoutProps {
    children?: React.ReactNode;
    title?: string;

}

function Layout({children, title = 'wawReactPlatform'}: ShopLayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            {children}
        </>
    );
}

export default Layout;
