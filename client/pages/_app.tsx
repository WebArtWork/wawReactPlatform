import "../assets/styles/globals.scss";
import {wrapper} from "@Redux/store";
import {Provider} from "react-redux";
import AuthProvider from "@Components/providers/AuthProvider";
import {AppProps} from "next/app";
import {TypeComponentAuthField} from "@Interfaces/app/NextPageWithProps";


type  TypeApp = AppProps & TypeComponentAuthField;

const MyApp = ({Component, ...rest}: TypeApp) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {pageProps} = props;

    return (
        <Provider store={store}>
            <AuthProvider Component={Component}>
                <Component {...pageProps} />
            </AuthProvider>
        </Provider>
    )
}

export default MyApp;
