import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import {handledarkMode} from "../store/actions/darkModeAction";

import {
    CartPage,
    CheckoutPage,
    HomePage,
    NotFoundPage,
    PanelLoginPage,
    PanelOrdersPage,
    PanelPage,
    PanelProductsPage,
    PanelQuantityPage,
    PaymentFailPage,
    PaymentPage,
    PaymentSuccessPage,
    ProductsPage,
    SingleProductPage
} from "../pages";


function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Public Routes*/}
                <Route path="/" element={<UserLayout/>}>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/products' element={<ProductsPage/>}/>
                    <Route path='/products/:id' element={<SingleProductPage/>}/>
                    <Route path='/checkout/cart' element={<CartPage/>}/>
                    <Route path='/checkout/finalize' element={<CheckoutPage/>}/>
                    <Route path='/payment' element={<PaymentPage/>}/>
                    <Route path='/payment/success' element={<PaymentSuccessPage/>}/>
                    <Route path='/payment/result' element={<PaymentFailPage/>}/>

                    <Route>
                        <Route path='/payment/success' element={<PaymentSuccessPage/>}/>
                        <Route path='/payment/result' element={<PaymentFailPage/>}/>
                        <Route path='/*' element={<NotFoundPage/>}/>
                    </Route>
                </Route>


                {/*Panel Routes*/}
                <Route path='/panel' >
                    <Route path='/panel' element={<PanelPage/>}/>
                    <Route path='/panel/login' element={<PanelLoginPage/>}/>
                    <Route path='/panel/products' element={<PanelProductsPage/>}/>
                    <Route path='/panel/quantity' element={<PanelQuantityPage/>}/>
                    <Route path='/panel/orders' element={<PanelOrdersPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default ProjectRoutes;