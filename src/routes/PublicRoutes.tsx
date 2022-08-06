import React from 'react';
import {Route, RouteMatch, Routes} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import {
    CartPage,
    CheckoutPage,
    HomePage, NotFoundPage, PaymentFailPage,
    PaymentPage,
    PaymentSuccessPage,
    ProductsPage,
    SingleProductPage
} from "../pages";


function PublicRoutes() {

    return (
        <Routes>
                <Route path='' element={<HomePage/>}/>
                <Route path='products' element={<ProductsPage/>}/>
                <Route path='products/:id' element={<SingleProductPage/>}/>
                <Route path='checkout/cart' element={<CartPage/>}/>
                <Route path='checkout/finalize' element={<CheckoutPage/>}/>


                <Route path='payment' element={<PaymentPage/>}/>
                <Route path={'payment'}>
                    <Route path='success' element={<PaymentSuccessPage/>}/>
                    <Route path='fail' element={<PaymentFailPage/>}/>
                </Route>
                <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default PublicRoutes;