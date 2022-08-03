import React from 'react';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
