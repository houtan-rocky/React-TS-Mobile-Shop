import React from "react";
import classes from "./Footer.module.scss";

export const Footer = () => {
    return (
        <div className={classes.Box}>
            <div className={classes.Container}>
                <div className={classes.Row}>
                    <div className={classes.Column}>
                        <p className={classes.Heading}>درباره ی ما</p>
                        <a className={classes.FooterLink} href="#">هدف</a>
                        <a className={classes.FooterLink} href="#">دیدگاه</a>
                        <a className={classes.FooterLink} href="#">نظرات شما</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={classes.Heading}>تماس با ما</p>
                        <a className={classes.FooterLink} href="#">اهواز</a>
                        <a className={classes.FooterLink} href="#">تهران</a>
                        <a className={classes.FooterLink} href="#">شیراز</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={classes.Heading}>خدمات</p>
                        <a className={classes.FooterLink} href="#">هدف</a>
                        <a className={classes.FooterLink} href="#">دیدگاه</a>
                        <a className={classes.FooterLink} href="#">نظرات شما</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={classes.Heading}>شبکه های اجتماعی</p>
                        <a className={classes.FooterLink} href="#">
                            <i className="fab fa-facebook-f">
                <span>
                  فیسبوک
                </span>
                            </i>
                        </a>
                        <a className={classes.FooterLink} href="#">
                            <i className="fab fa-instagram">
                <span>
                  اینستاگرام
                </span>
                            </i>
                        </a>
                        <a href="#" className={classes.FooterLink}>
                            <i className="fab fa-twitter">
                <span>
                  توییتر
                </span>
                            </i>
                        </a>
                        <a href="#" className={classes.FooterLink}>
                            <i className="fab fa-youtube">
                <span>
                  یوتوب
                </span>
                            </i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
