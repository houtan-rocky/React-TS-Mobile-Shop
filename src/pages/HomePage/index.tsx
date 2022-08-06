import React from "react";
import Helmet from "../../components/Helmet/Helmet";

export const HomePage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'خانه'}>
                Home
            </Helmet>
        </main>
    )
}