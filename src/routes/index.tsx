import React from 'react';
import { useRoutes} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";



import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PanelLayout from "../layouts/panelLayout";
import {PanelLoginPage} from "../pages";


function ProjectRoutes() {
    const allRoutes = useRoutes([
        {
            path: 'panel/login',
            element: <PanelLoginPage/>,
            children: [
                {}
            ]
        },
        {
            path: '/panel/*',
            element: <PanelLayout/>,
            children: [
                {
                    path: '*',
                    element: <ProtectedRoutes/>
                }
            ]
        },
        {
            path: '/*',
            element: <UserLayout/>,
            children: [
                {
                    path: '*',
                    element: <PublicRoutes/>
                }
            ]
        }
    ])
    return (
        allRoutes
    );
}

export default ProjectRoutes;

