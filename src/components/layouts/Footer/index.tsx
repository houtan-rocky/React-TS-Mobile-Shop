import React from "react";
import classes from "./Footer.module.scss";

function Footer() {
    console.log(classes)
    return (
        <div className={classes["main-footer"]}>
            <div>

                <div>
                    محصولات
                    خدمات
                    ...
                </div>
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