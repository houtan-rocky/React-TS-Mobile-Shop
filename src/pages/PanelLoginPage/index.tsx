import React from "react";
import Helmet from "../../components/Helmet";
import Button from "../../components/Button";
import LoginForm from "../../components/LoginForm";

export const PanelLoginPage: React.FC = () => {
    return <Helmet className={'main'} title={'ورود ادمین'}>
        <div className={'container'}>
            <LoginForm/>
        </div>
    </Helmet>
}