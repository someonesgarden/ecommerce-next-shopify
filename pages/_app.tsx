import "@assets/main.css";
import "styles/style.scss";
import 'keen-slider/keen-slider.min.css'

// @ts-ignore
import {AppProps} from "next/app";
import {UIProvider, useUI} from "@components/ui/context";

function MyApp({Component, pageProps}: AppProps & {Component: {Layout: any}}) {
    const Noop =({children})=>  <>{children}</>;
    const Layout = Component.Layout ?? Noop;

    return (
       <UIProvider>
           <Layout>
               <Component {...pageProps}/>
           </Layout>
       </UIProvider>
    )
}

export default MyApp
