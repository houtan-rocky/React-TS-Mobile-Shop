import React, {useEffect, useRef} from "react";
import 'assets/boxicons-2.0.7/css/boxicons.css';
import logo from 'assets/images/Logo-2.png';
import {Link, useLocation} from "react-router-dom";


const PanelHeader = (props: any) => {

    const {pathname} = useLocation()
    const activeNav = props.links.findIndex((e: any) => e.path === pathname)

    const headerRef = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                if (headerRef)
                    headerRef.current!.classList.add('shrink')
            } else {
                if (headerRef)
                    headerRef.current!.classList.remove('shrink')
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
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt=""/>
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
                    <div className={'header__menu__right'}>
                        <Link to={'/'}>
                            <i className={'bx bx-log-out-circle'}></i>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default PanelHeader;



