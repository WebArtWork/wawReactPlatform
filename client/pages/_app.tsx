import "../styles/globals.scss"
import "../styles/Login.scss"
import "../styles/Profile.scss"
import "../styles/Users.scss"
import "Components/Modal/Modal.scss"
import "Components/Navbar/Navbar.scss"
import "Components/Sidebar/Sidebar.scss"
import "Components/PWDRequire/PWDRequire.scss"
import {wrapper} from "Redux/store";

function MyApp({Component, pageProps}: any) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(MyApp);
