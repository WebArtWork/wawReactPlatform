import "../assets/styles/globals.scss";
import {wrapper} from "@Redux/store";

function MyApp({Component, pageProps}: any) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(MyApp);
