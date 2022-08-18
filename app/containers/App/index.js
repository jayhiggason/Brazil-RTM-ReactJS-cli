/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import {Route, Switch} from "react-router-dom";
import LoginPage from "../LoginPage/Loadable";
import SignUp from "../SignUp/Loadable";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../../utils/history";
import {getCookie} from "../../utils/cookieUtilities";
import MainApp from "./app";
import GlobalStyle from "../../GlobalStyle";
import PocView from "../PocView/Loadable";
import RightDrawer from "../../components/RightDrawer";

export default function App() {
    const userToken = getCookie("tokenObj");
    const landingPage = history.location.pathname === "/";
    if (userToken && landingPage) {
        history.push("/RTM/PerformanceSummary");
    }

    return (
        <div>
            <GlobalStyle/>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/signUp" component={SignUp}/>
                <MainApp/>
            </Switch>
        </div>
    );
}


