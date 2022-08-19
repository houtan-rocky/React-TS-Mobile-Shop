import React from "react";
import Helmet from "../../components/Helmet";

export const PaymentSuccessPage: React.FC = () => {
    return <main className={'main'}>
        <Helmet title={'موفقیت خرید'}>
            خرید شما با موفقیت انجام شد.
        </Helmet>
    </main>
}