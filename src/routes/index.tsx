import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {
    HomePage,
    ProductsPage,
    SingleProductPage,
    CartPage,
    CheckoutPage,
    PaymentPage,
    PaymentSuccessPage,
    PaymentFailPage,
    PanelPage,
    PanelLoginPage,
    PanelProductsPage,
    PanelQuantityPage,
    PanelOrdersPage,
    NotFoundPage
} from 'pages'
import UserLayout from "../layouts/UserLayout";
import {handledarkMode} from "../store/actions/darkModeAction";

function ProjectRoutes() {
    return (
        <Routes>
            <Route path='/' element={<UserLayout darkMode={handledarkMode}><HomePage/></UserLayout>}/>
            <Route path='/products' element={<UserLayout><ProductsPage/></UserLayout>}/>
            <Route path='/products/:id' element={<UserLayout><SingleProductPage/></UserLayout>}/>
            <Route path='/checkout/cart' element={<UserLayout><CartPage/></UserLayout>}/>
            <Route path='/checkout/finalize' element={<UserLayout><CheckoutPage/></UserLayout>}/>
            <Route path='/payment' element={<UserLayout><PaymentPage/></UserLayout>}></Route>
            <Route path='/payment/success' element={<UserLayout><PaymentSuccessPage/></UserLayout>}/>
            <Route path='/payment/result' element={<UserLayout><PaymentFailPage/></UserLayout>}/>
            <Route path='/panel' element={<PanelPage/>}/>
            <Route path='/panel/login' element={<PanelLoginPage/>}/>
            <Route path='/panel/products' element={<PanelProductsPage/>}/>
            <Route path='/panel/quantity' element={<PanelQuantityPage/>}/>
            <Route path='/panel/orders' element={<PanelOrdersPage/>}/>
            <Route path='/not-found' element={<UserLayout><NotFoundPage/></UserLayout>}/>
            <Route path='*' element={<Navigate replace to="/not-found"/>}/>
        </Routes>
    );
}

export default ProjectRoutes;