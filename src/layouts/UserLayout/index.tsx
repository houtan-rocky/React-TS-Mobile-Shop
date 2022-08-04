import React from "react"
import {Navbar} from "./Navbar";
import {Footer} from "./Footer";


const Layout = (props: any) => {
    return (
        <>
            <Navbar />
            <main>{props.children}</main>
            <Footer/>
        </>
    )
}

export default Layout;