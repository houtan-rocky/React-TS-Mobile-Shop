import React from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFoundPage, PanelLoginPage, PanelOrdersPage, PanelPage, PanelProductsPage, PanelQuantityPage} from "../pages";

function ProtectedRoutes() {
    return (
        <Routes>
            <Route path='products' element={<PanelProductsPage/>}/>
            <Route path='quantity' element={<PanelQuantityPage/>}/>
            <Route path='orders' element={<PanelOrdersPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default ProtectedRoutes;
