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
import FreeRoute from "./FreeRoute";
import ProtectedRoute from "./ProtectedRoute";
import CrearEventoContainer from "../src/js/components/Evento/Crear"
require('./style/index.css');

const Routes = (props) => (
    <div>
        <div className="container__content">
            <Switch>
                <FreeRoute exact path="/" component={Default} {...props}/>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/crear-evento" component={CrearEventoContainer} />
                {/*<ProtectedRoute exact path="/" component={Demo} />*/}
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
export default <Routes/>