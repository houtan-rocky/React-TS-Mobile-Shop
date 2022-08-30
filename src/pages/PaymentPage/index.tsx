import React from "react";
import Helmet from "../../components/Helmet";
import {Outlet} from "react-router-dom";

export const PaymentPage: React.FC =  () => {
    return <main className={'main'}>
        <Helmet title={'صفحه ی پرداخت'}>
            <div className={'payment'}>
                <Outlet/>
            </div>
        </Helmet>
    </main>
}