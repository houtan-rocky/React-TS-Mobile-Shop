import React from "react"
import {Navbar} from "../Navbar";
import {Footer} from "../Footer";
import classes from './Layout.module.scss'

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