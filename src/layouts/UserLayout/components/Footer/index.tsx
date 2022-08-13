import React from 'react'

import {Link} from 'react-router-dom'

import Grid from 'components/ui/Grid'

import logo from 'assets/images/Logo-2.png'

const footerAboutLinks = [
    {
        display: "کنسول بازی",
        path: "/"
    },
    {
        display: "لوازم جانبی کامپیوتر",
        path: "/"
    },
    {
        display: "موبایل",
        path: "/"
    },
    {
        display: "لوازم جانبی کنسول",
        path: "/"
    }
]

const footerCustomerLinks = [
    {
        display: "تلوزیون",
        path: "/"
    },
    {
        display: "سینمای خانگی",
        path: "/"
    },
    {
        display: "اسپیکر",
        path: "/"
    }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            تماس با ما
                        </div>
                        <div className="footer__content">
                            <p>
                                دفتر تهران <a href={'tel:۰۲۱۳۳۳۳۲۲۲۲'}>۰۲۱۳۳۳۳۲۲۲۲</a>
                            </p>
                            <p>
                                دفتر شیراز <a href={'tel:۰۲۱۳۳۳۳۲۲۲۲'}>۰۲۱۳۳۳۳۲۲۲۲</a>
                            </p>
                            <p>
                                دفتر اهواز <a href={'tel:۰۲۱۳۳۳۳۲۲۲۲'}>۰۲۱۳۳۳۳۲۲۲۲</a>
                            </p>

                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            لوازم الکترونیکی
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            لوازم الکترونیکی
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt=""/>
                            </Link>
                        </p>
                        <p>
                            فروشگاه اینترنتی فیجیکالا با بیش از یک دهه تجربه٬ بزرگترین فروشگاه آنلاین ایران.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
