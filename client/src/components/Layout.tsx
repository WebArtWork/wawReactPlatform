import React from 'react';
import Head from "next/head";

interface ShopLayoutProps {
    children?: React.ReactNode;
    title?: string;
}

function Layout({children, title = 'wawReactPlatform'}: ShopLayoutProps) {
    return (
        <>
            <Head>

            </Head>
            {children}
        </>
    );
}

export default Layout;
