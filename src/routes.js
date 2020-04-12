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
import CrearEventoContainer from "./js/components/Evento/Crear"
import InicioContainer from "./js/components/Inicio"
import EventoDetalleContainer from "./js/components/Evento/Detalle"
import ListarEventosContainer from "./js/components/Evento/Listar"
import UserEventsContainer from "./js/components/Evento/AdminEvents"
import EventoEditarContainer from "./js/components/Evento/Editar"
require('./style/index.css');
import "./style/custom_styles.css"

const Routes = (props) => (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <FreeRoute exact path="/" component={InicioContainer} {...props}/>
                <FreeRoute exact path="/eventos-list" component={ListarEventosContainer} {...props} />
                <ProtectedRoute exact path="/crear-evento" component={CrearEventoContainer} />
                <ProtectedRoute exact path="/mis-eventos" component={UserEventsContainer} />
                <ProtectedRoute exact path="/eventos/:id/editar" component={EventoEditarContainer} />
                <ProtectedRoute exact path="/eventos/:id/detail" component={EventoDetalleContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
export default <Routes/>