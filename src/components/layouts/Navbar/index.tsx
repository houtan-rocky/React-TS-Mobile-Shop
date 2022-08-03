import React from 'react';
import classes from  './Navbar.module.scss'
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <nav className={classes.nav}>
            <Link to="/" className={classes['site-title']}> فیجیکالا </Link>

            <form className={classes['search-form']}>
                <input type="search" id="search-box" placeholder="اینجا جستجو کنید..."/>
                <label htmlFor="search-box" ></label>
            </form>
            <ul>

                <li>
                    <Link to="/products">محصولات</Link>
                </li>
                <li>
                    <Link to="/checkout/cart">سبد خرید</Link>
                </li>
            </ul>

        </nav>
    );
}
