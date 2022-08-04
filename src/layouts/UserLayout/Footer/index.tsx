import React, {useState} from "react";
import classes from "./Footer.module.scss";

export const Footer = () => {
    const [darkMode, setDarkMode] = useState(false)
    const toggleTheme = () => setDarkMode(!darkMode)

    const handleThemeChange = () => {

    }

    return (
        <div  className={`${darkMode ? classes.boxDark : classes.box}`}>
        <button onClick={toggleTheme}>dark/light</button>
            <div className={classes.Container}>
                <div className={classes.Row}>
                    <div className={classes.Column}>
                        <p className={darkMode? classes.headingDark : classes.heading}>درباره ی ما</p>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">هدف</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">دیدگاه</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">نظرات شما</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={darkMode? classes.headingDark : classes.heading}>تماس با ما</p>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">اهواز</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">تهران</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">شیراز</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={darkMode? classes.headingDark : classes.heading}>خدمات</p>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">هدف</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">دیدگاه</a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">نظرات شما</a>
                    </div>
                    <div className={classes.Column}>
                        <p className={darkMode? classes.headingDark : classes.heading}>شبکه های اجتماعی</p>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">
                            <i className="fab fa-facebook-f">
                <span>
                  فیسبوک
                </span>
                            </i>
                        </a>
                        <a className={darkMode? classes.footerLinkDark : classes.footerLink} href="#">
                            <i className="fab fa-instagram">
                <span>
                  اینستاگرام
                </span>
                            </i>
                        </a>
                        <a href="#" className={darkMode? classes.footerLinkDark : classes.footerLink}>
                            <i className="fab fa-twitter">
                <span>
                  توییتر
                </span>
                            </i>
                        </a>
                        <a href="#" className={darkMode? classes.footerLinkDark : classes.footerLink}>
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
