import React from "react"
import {Outlet} from "react-router-dom";
import PanelHeader from "./components/Header";

const panelNav = [
    {
        display: 'کالاها',
        path: '/panel/products'
    },
    {
        display: 'موجودی و قیمت ها',
        path: '/panel/quantity'
    },
    {
        display: 'سفارش ها',
        path: '/panel/orders'
    },

]

const PanelLayout = () => {
    return (
        <>
            <PanelHeader links={panelNav}/>
            <Outlet/>
        </>
    )
}

export default PanelLayout;