import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PanelLoginPage, PanelOrdersPage, PanelPage, PanelProductsPage, PanelQuantityPage} from "../pages";

function ProtectedRoutes() {
    return (
        <Routes>
                <Route path='login' element={<PanelLoginPage/>}/>
                <Route path='products' element={<PanelProductsPage/>}/>
                <Route path='quantity' element={<PanelQuantityPage/>}/>
                <Route path='orders' element={<PanelOrdersPage/>}/>
        </Routes>
    );
}

export default ProtectedRoutes;
