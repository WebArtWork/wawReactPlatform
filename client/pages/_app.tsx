import "../styles/globals.scss"
import "../styles/Login.scss"
import "../styles/Profile.scss"
import "../styles/Users.scss"
import "../modal/Modal.scss"
import "../components/Navbar/Navbar.scss"
import "../components/Sidebar/Sidebar.scss"
import "../components/PWDRequire/PWDRequire.scss"
import {CookiesProvider} from "react-cookie";

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>

        </>
    )
}