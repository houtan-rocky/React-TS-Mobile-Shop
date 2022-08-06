import React from "react";
import Helmet from "../../components/Helmet/Helmet";

export const CartPage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'سبد خرید'}>
                سبد خرید
            </Helmet>
        </main>
    )
}