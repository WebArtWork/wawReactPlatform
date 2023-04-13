import React, {FC} from 'react';
import Head from "next/head";
import Navbar from "@Components/commons/Navbar";
import styles from './style.module.scss';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

const Layout: FC<LayoutProps> = ({children, title = ''}) => {
    return (
        <>
            <Head>
                <title>{!!title && `${title} |`} Web Art Work</title>
            </Head>
            <div className={styles.wrapper}>
                <Navbar/>
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Layout;
