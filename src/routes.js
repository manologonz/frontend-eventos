import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import { NotificationContainer } from 'react-notifications';
import Login from "./js/components/Login"
import Default from "./js/components/Default/Default";
import NotFound from './js/components/layout/NotFound/NotFound';
import NavBar from "./js/components/layout/NavBar/NavBar";
import FreeRoute from "./FreeRoute";
require('./style/index.css');

const Routes = (props) => (
    <div>
        <div className="container__content">
            <Switch>
                <FreeRoute exact path="/" component={Default} {...props}/>
                <Route exact path="/login" component={Login} />
                {/*<Route exact path="/registro" component={Registro} />*/}
                {/*<ProtectedRoute exact path="/" component={Demo} />*/}
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
export default <Routes/>