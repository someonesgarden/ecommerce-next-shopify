import style from "./Layout.module.css";
import {Footer, Navbar} from "@components/common";
import {Sidebar} from "@components/ui";
import {CartSidebar} from "@components/cart";
import {useUI} from "@components/ui/context";
import {ApiProvider} from "@framework";

const Layout: ({children}: { children: any }) => JSX.Element =({children})=> {
    const {isSidebarOpen, closeSidebar} = useUI();

    return (
        <ApiProvider>
            <div className={style.root}>
                <Navbar />
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
                    <CartSidebar />
                </Sidebar>
                <main
                    className="fit">
                    {children}
                </main>
                <Footer />
            </div>
        </ApiProvider>
    )
}

export default Layout;




