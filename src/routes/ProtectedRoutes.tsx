import React, {useEffect} from 'react';
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import {NotFoundPage, PanelOrdersPage, PanelProductsPage, PanelQuantityPage} from "../pages";
import {CheckUserExpired, removeAllUserData} from "../utils/functions.util";
import {PATHS} from "../configs/routes.config";
import PanelLayout from "../layouts/panelLayout";
import UserLayout from "../layouts/UserLayout";


const useAuth = () => {
    if (localStorage.hasOwnProperty('IS_LOGGED_IN')) {
        return JSON.parse(localStorage.getItem('IS_LOGGED_IN') as string);
    } else {
        return false;
    }
}


function ProtectedRoutes() {
    const protectedRoutes = useRoutes([
        {
            path: '',
            element: <PanelLayout/>,
            children: [
                {
                    path: '',
                    element: <div>panel</div>,
                },
                {
                    path: 'products',
                    element: <PanelProductsPage/>,
                },
                {
                    path: 'quantity',
                    element: <PanelQuantityPage/>,
                },
                {
                    path: 'orders',
                    element: <PanelOrdersPage/>,
                },
                {
                    path: '*',
                    element: <NotFoundPage/>,
                }
            ]
        }])

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("Protected");
    }, [location]);

    const isAuth = useAuth();
    if (isAuth === true || isAuth === "true") {
        return protectedRoutes;
    } else {
        removeAllUserData();
        return <Navigate to={'/panel/login'}></Navigate>;
    }

}

// Protected Pages Just For Admin Users
const useAdminAuth = () => {
    if (localStorage.hasOwnProperty('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData') as string);
        return userData.role;
    } else {
        return false;
    }
}

export const ProtectedForAdminRtoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("ProtectedForAdmin");
    }, [location]);

    const isAuth = useAuth();
    const isAdminAuth = useAdminAuth();
    return isAuth && isAdminAuth === "admin" ? <div>you're qualified</div> : <Navigate to={PATHS.PANEL}/>;
};

export default ProtectedRoutes;
