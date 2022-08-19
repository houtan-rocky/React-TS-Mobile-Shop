import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import {handledarkMode} from "store/actions/darkModeAction";

import ProjectRoutes from "./routes";

function App() {
    console.count('App run')
    return (
        <BrowserRouter>
            <ProjectRoutes/>
        </BrowserRouter>
    );
}

export default App;
