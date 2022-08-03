import React from "react";
import "./Footer.scss";

function Footer() {
    return (
        <div className="main-footer">
            <div className="container">

                <div className="row">
                    محصولات
                    خدمات
                    ...
                </div>
                <hr/>
                <div className="row">
                    <p className="col-sm">
                        تمام حقوق برای فیجیکالا محفوظ است {new Date().getFullYear()}&copy;
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;