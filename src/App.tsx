import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {ProductsPage} from './pages/productsPage'
import {SingleProductPage} from "./pages/singleProductPage";
import {CartPage} from "./pages/cartPage";
import {Checkout} from "./pages/checkoutPage";
import {PaymentPage} from "./pages/paymentPage";
import {PaymentSuccessPage} from "./pages/paymentSuccessPage";
import { PaymentFailPage} from "./pages/paymentFailPage";
import {PanelLoginPage} from "./pages/panelLoginPage";
import {PanelProductsPage} from "./pages/panelProductsPage";
import {PanelQuantityPage} from "./pages/panelQuantityPage";
import {PanelOrdersPage} from "./pages/panelOrdersPage";
import { NotFoundPage} from "./pages/notFoundPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/product/' element={<SingleProductPage/>}/>
                <Route path='/checkout/cart' element={<CartPage/>}/>
                <Route path='/checkout/' element={<Checkout/>}/>
                <Route path='/payment' element={<PaymentPage/>}/>
                <Route path='/payment-result-fail' element={<PaymentFailPage/>}/>
                <Route path='/payment-result-success' element={<PaymentSuccessPage/>}/>
                <Route path='/panel-login' element={<PanelLoginPage/>}/>
                <Route path='/panel-products' element={<PanelProductsPage/>}/>
                <Route path='/panel-quantity' element={<PanelQuantityPage/>}/>
                <Route path='/panel-orders' element={<PanelOrdersPage/>}/>
                <Route path='/not-found' element={<NotFoundPage/>} />
                <Route path='*' element={<Navigate replace to="/not-found"/>} />
            </Routes>
        </div>
    );
}

export default App;
