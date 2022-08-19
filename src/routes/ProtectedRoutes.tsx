import React from 'react';
import { useRoutes} from "react-router-dom";
import {NotFoundPage, PanelOrdersPage, PanelProductsPage, PanelQuantityPage} from "../pages";





function ProtectedRoutes() {
    const protectedRoutes = useRoutes([
        {
            path: 'products',
            element: <PanelProductsPage/>,
        },
        {
            path: 'quantity',
            element: <PanelQuantityPage/>,
        },
        {
            path: 'orders',
            element: <PanelOrdersPage/>,
        },
        {
            path: '*',
            element: <NotFoundPage/>,
        }
    ])


    return (
        protectedRoutes
    );
}

export default ProtectedRoutes;
