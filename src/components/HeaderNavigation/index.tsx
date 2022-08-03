import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const HeaderNavigation: React.FC = () => {
    return (
        <div className="header-nav-container">
            <div className="nav-items-left">
                <Link className="nav-item shopname" to={'/'}>Shopspree</Link>
                <Link className="nav-item" to={'/product'}>All Products</Link>
            </div>
            <div className="nav-items-right">
            </div>
        </div>
    )
};