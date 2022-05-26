import Head from "next/head"
import "../styles/globals.scss"
import "../styles/Login.scss"
import "../styles/Profile.scss"
import "../styles/Users.scss"
import "../components/Navbar/Navbar.scss"
import "../components/Sidebar/Sidebar.scss"
import {CookiesProvider} from "react-cookie";


export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
            </Head>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>

        </>
    )
}