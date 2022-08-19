import React from "react";
import Helmet from "../../../components/Helmet";
import './index.css'
import OrdersTable from "./CrudTable";
import {Route, Routes} from "react-router-dom";

export const PanelOrdersPage: React.FC = () => {
    return <main className={'main'}>
        <Helmet title={'مدیریت سفارشات'}>
            <OrdersTable/>
        </Helmet>
    </main>
}