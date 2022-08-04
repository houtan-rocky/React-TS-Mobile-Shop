import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ProductsPage} from './pages/ProductsPage'
import {SingleProductPage} from "./pages/SingleProductPage";
import {CartPage} from "./pages/CartPage";
import {Checkout} from "./pages/CheckoutPage";
import {PaymentPage} from "./pages/PaymentPage";
import {PaymentSuccessPage} from "./pages/PaymentSuccessPage";
import {PaymentFailPage} from "./pages/PaymentFailPage";
import {PanelLoginPage} from "./pages/PanelLoginPage";
import {PanelProductsPage} from "./pages/PanelProductsPage";
import {PanelQuantityPage} from "./pages/PanelQuantityPage";
import {PanelOrdersPage} from "./pages/PanelOrdersPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import UserLayout from "./layouts/UserLayout";


import {handledarkMode} from "./store/actions/darkModeAction";
import {PanelPage} from "./pages/PanelPage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<UserLayout darkMode={handledarkMode}><HomePage/></UserLayout>}/>
            <Route path='/products' element={<UserLayout><ProductsPage/></UserLayout>}/>
            <Route path='/product/:id' element={<UserLayout><SingleProductPage/></UserLayout>}/>
            <Route path='/checkout/cart' element={<UserLayout><CartPage/></UserLayout>}/>
            <Route path='/checkout/' element={<UserLayout><Checkout/></UserLayout>}/>
            <Route path='/payment' element={<UserLayout><PaymentPage/></UserLayout>}></Route>
            <Route path='/payment-result-fail' element={<UserLayout><PaymentFailPage/></UserLayout>}/>
            <Route path='/payment-result-success' element={<UserLayout><PaymentSuccessPage/></UserLayout>}/>
            <Route path='/panel/login' element={<UserLayout><PanelLoginPage/></UserLayout>}/>
            <Route path='/panel' element={<Navigate replace to='/panel/login'/>}/>
            <Route path='/panel/products' element={<UserLayout><PanelPage/></UserLayout>}/>
            <Route path='/panel/quantity' element={<UserLayout><PanelQuantityPage/></UserLayout>}/>
            <Route path='/panel/orders' element={<UserLayout><PanelOrdersPage/></UserLayout>}/>
            <Route path='/not-found' element={<UserLayout><NotFoundPage/></UserLayout>}/>
            <Route path='*' element={<Navigate replace to="/not-found"/>}/>
        </Routes>
    );
}

export default App;
