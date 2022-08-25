import React from 'react';
import App from "./App";
import './styles/main.scss'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from './redux/store';
import {render} from "react-dom";


render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);