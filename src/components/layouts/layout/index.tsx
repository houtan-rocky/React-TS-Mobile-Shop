import React from "react"
import {Navbar} from "../Navbar";
import Footer from "../Footer";

function Layout(props: any) {
    return (
        <>
            <Navbar/>
            <main>{props.children}</main>
            <Footer/>
        </>
    )
}

export default Layout;