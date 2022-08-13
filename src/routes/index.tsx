import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import {handledarkMode} from "../store/actions/darkModeAction";


import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PanelLayout from "../layouts/panelLayout";
import {PanelLoginPage} from "../pages";


function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/*Panel*/}

                {/*Panel Login*/}
                <Route path='panel/login' element={<PanelLoginPage/>}/>

                {/*Panel Protected Routes*/}
                <Route path={"/panel/*"} element={<PanelLayout/>}>
                    <Route path={"*"} element={<ProtectedRoutes/>}/>
                </Route>

                {/*Public Routes*/}
                <Route path={'/*'} element={<UserLayout/>}>
                    <Route path={"*"} element={<PublicRoutes/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default ProjectRoutes;

