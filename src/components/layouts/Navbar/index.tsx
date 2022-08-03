import React, {useState} from "react";
import classes from './Navbar.module.scss'
import {Link} from "react-router-dom";


import {BiMenuAltRight} from "react-icons/bi";
import {AiOutlineCloseSquare} from "react-icons/ai";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuToggler = () => setMenuOpen((p) => !p);

    return (
        <div className={classes.header}>
            <div className={classes.header__content}>
                <div>
                    <Link className={classes.logo} to={'/'}>فیجیکالا</Link>
                </div>
                <div>
                    <nav className={`${classes.nav} ${menuOpen ? classes[`nav--open`] : {}}`}>
                        <Link className={classes.nav__item} to={"/products"}>
                            محصولات
                        </Link>

                        <Link className={classes.nav__item} to={"/panel"}>
                            مدیریت
                        </Link>
                        <div className={classes.nav__button__container}>
                            <Button/>
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={classes.header__button__container}>
                        <Button/>
                    </div>
                    <button className={classes.header__toggler} onClick={menuToggler}>
                        {!menuOpen ? <BiMenuAltRight/> : <AiOutlineCloseSquare/>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Button = () => {
    return (
        <Link className={classes.button} to={'/checkout/cart'}>سبد خرید</Link>
)
};

