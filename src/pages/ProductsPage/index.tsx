import React from "react";
import Helmet from "../../components/Helmet/Helmet";

export const ProductsPage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'محصولات'}>
                محصولات
            </Helmet>
        </main>
    )
}