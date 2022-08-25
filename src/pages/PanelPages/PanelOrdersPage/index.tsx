import React from "react";
import Helmet from "../../../components/Helmet";
import '../index.css'
import OrdersTable from "../components/panelTable";
import {getOrders, searchOrder} from "../../../api/getOrder.api";

export const PanelOrdersPage: React.FC = () => {
    const tableHeads = [
        {
            id: 1,
            name: 'first-name',
            display: 'نام',
        }, {
            id: 2,
            name: 'last-name',
            display: 'نام خانوادگی',
        }, {
            id: 3,
            name: 'total-bill',
            display: 'مجموع رسید'
        }, {
            id: 4,
            name: 'order_registration_date',
            display: 'زمان ثبت',
        }, {
            id: 5,
            name: 'status',
            display: 'وضعیت',
        }
    ]


    return <main className={'main'}>
        <Helmet title={'مدیریت سفارشات'}>
            <OrdersTable getTableItems={getOrders} tableHeads={tableHeads} filter={true} searchTableItems={searchOrder}/>
        </Helmet>
    </main>
}