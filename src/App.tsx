import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import {handledarkMode} from "store/actions/darkModeAction";

import ProjectRoutes from "./routes";

function App() {
    console.count('App run')
    return (
        <ProjectRoutes/>
    );
}

export default App;
