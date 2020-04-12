import React from 'react';
import {NavLink} from "react-router-dom";

const AdminOptions = () => {
    return (
        <ul className="nav-list">
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/">
                    Inicio
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/crear-evento">
                    Crear Evento
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/eventos-list">
                    Eventos
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/mis-eventos">
                    Mis Eventos
                </NavLink>
            </li>
        </ul>
    );
};

export default AdminOptions;