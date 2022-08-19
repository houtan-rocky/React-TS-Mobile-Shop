import React from "react";
import Helmet from "../../components/Helmet";

export const PaymentFailPage: React.FC = () => {
    return <main className={'main'}>
        <Helmet title={'خرید ناموفق'}>
            عملیات خرید انجام <b>نشد</b>
        </Helmet>
    </main>
}