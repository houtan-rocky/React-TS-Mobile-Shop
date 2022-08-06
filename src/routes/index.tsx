import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import {handledarkMode} from "../store/actions/darkModeAction";


import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";


function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={"/panel/*"}>
                    <Route path={"*"} element={<ProtectedRoutes/>}/>
                </Route>

                <Route path={'/*'} element={<UserLayout/>}>
                    <Route path={"*"} element={<PublicRoutes/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default ProjectRoutes;

