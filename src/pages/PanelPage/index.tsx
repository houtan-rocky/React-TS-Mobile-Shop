import React from "react";
import Helmet from "../../components/Helmet/Helmet";

export function PanelPage(props: any) {
    return <main className={'main'}>
        <Helmet title={'پنل مدیریت'}>
            پنل مدیریت
        </Helmet>
    </main>;
}