import React from "react"
import {Navbar} from "./Navbar";
import Footer from "./Footer";


const Layout = (props: any) => {
    return (
        <div>
            <Navbar/>
            <main className={"main"} style={{padding: '0 20px'}}>{props.children}</main>
            <Footer/>
        </div>
    )
}

export default Layout;