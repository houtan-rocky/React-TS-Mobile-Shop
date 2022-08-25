
import React from "react";
import Helmet from "../../../components/Helmet";
import PanelTable from "../components/panelTable";
import {GetProducts, searchProduct} from "../../../api/product";

export const PanelProductsPage = () => {
    const tableHeads = [
        {
            id: 1,
            name: 'product-name-en',
            display: 'نام محصول',
        }, {
            id: 2,
            name: 'category-id',
            display: 'دسته بندی محصول',
        }
    ]

    return <main className={'main'} >
        <Helmet title={'مدیریت محصولات'}>
            <PanelTable getTableItems={GetProducts} searchTableItems={searchProduct} tableHeads={tableHeads}/>
        </Helmet>
    </main>
}