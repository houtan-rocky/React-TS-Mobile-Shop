import React, {useEffect, useRef} from "react";
import 'assets/boxicons-2.0.7/css/boxicons.css';
import logo from 'assets/images/Logo-2.png';
import {Link, useLocation} from "react-router-dom";


export const Header = (props: any) => {

    const {pathname} = useLocation()
    const activeNav = props.links.findIndex((e: any) => e.path === pathname)

    const headerRef = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                if (headerRef.current)
                    headerRef.current.classList.add('shrink')
            } else {
                if (headerRef.current)
                    headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }

    useEffect(handleScroll, []);

    const menuLeft = useRef<HTMLDivElement>(null)

    const menuToggle = () => menuLeft.current!.classList.toggle('active')

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo"  onClick={menuToggle}>

                        <Link to={"/"}>
                            <img src={logo} alt="website logo"/>
                        </Link>
                </div>
                <div className="header__menu ">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className={`header__menu__left`} ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            props.links.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    <div className="header__menu__right">
                        <Link to={'/search'}>
                            <div className="header__menu__item header__menu__right__item">
                                <i className="bx bx-search"></i>
                            </div>
                        </Link>

                        <div className="header__menu__item header__menu__right__item">
                            <Link to={'/user/login'}>
                                <i className="bx bx-user"></i>
                            </Link>
                        </div>

                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/checkout/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}




