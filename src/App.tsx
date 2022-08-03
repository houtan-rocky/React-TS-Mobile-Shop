import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ProductsPage} from './pages/ProductsPage'
import {SingleProductPage} from "./pages/SingleProductPage";
import {CartPage} from "./pages/CartPage";
import {Checkout} from "./pages/CheckoutPage";
import {PaymentPage} from "./pages/PaymentPage";
import {PaymentSuccessPage} from "./pages/PaymentSuccessPage";
import { PaymentFailPage} from "./pages/PaymentFailPage";
import {PanelLoginPage} from "./pages/PanelLoginPage";
import {PanelProductsPage} from "./pages/PanelProductsPage";
import {PanelQuantityPage} from "./pages/PanelQuantityPage";
import {PanelOrdersPage} from "./pages/PanelOrdersPage";
import { NotFoundPage} from "./pages/NotFoundPage";
import Layout from "./components/layouts/layout";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/product/' element={<SingleProductPage/>}/>
                <Route path='/checkout/cart' element={<CartPage/>}/>
                <Route path='/checkout/' element={<Checkout/>}/>
                <Route path='/payment' element={<PaymentPage/>}/>
                <Route path='/payment-result-fail' element={<PaymentFailPage/>}/>
                <Route path='/payment-result-success' element={<PaymentSuccessPage/>}/>
                <Route path='/panel/login' element={<PanelLoginPage/>}/>
                <Route path='/panel' element={<Navigate replace to='/panel/login'/>}/>
                <Route path='/panel/products' element={<PanelProductsPage/>}/>
                <Route path='/panel/quantity' element={<PanelQuantityPage/>}/>
                <Route path='/panel/orders' element={<PanelOrdersPage/>}/>
                <Route path='/not-found' element={<NotFoundPage/>} />
                <Route path='*' element={<Navigate replace to="/not-found"/>} />
            </Routes>
        </Layout>
    );
}

export default App;
