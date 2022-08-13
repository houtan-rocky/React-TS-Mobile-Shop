import React from "react"
import {Header} from "./components/Header";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";

const mainNav = [
    {
        display: 'خانه',
        path: '/'
    },
    {
        display: 'سبد خرید',
        path: '/checkout/cart'
    },
    {
        display: 'محصولات',
        path: '/products'
    },

]

const UserLayout = () => {
    return (
        <>
            <Header links={mainNav} />
            <Outlet/>
            <Footer/>
        </>
    )
}

export default UserLayout;