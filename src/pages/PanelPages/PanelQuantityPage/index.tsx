
import React from "react";
import Helmet from "../../../components/Helmet";
import PanelTable from "../components/panelTable";
import {GetProducts} from "../../../api/product";

export const PanelQuantityPage = () => {
    const tableHeads = [
        {
            id: 1,
            name: 'product_name_en',
            display: 'نام محصول',
        }, {
            id: 2,
            name: 'price.amount',
            display: 'قیمت',
        } ,{
            id: 3,
            name: 'count',
            display: 'موجودی',
        }
    ]

    return <main className={'main'}>
                <Helmet title={'مدیریت تعداد و قیمت'}>
        <PanelTable getTableItems={GetProducts} tableHeads={tableHeads}/>
                </Helmet>
    </main>
}