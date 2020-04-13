import React from 'react';
import {NavLink} from "react-router-dom";

const ClientOptions = () => {
    return (
        <ul className="nav-list">
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/"
                >
                    Inicio
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/eventos-list"
                >
                    EVENTOS
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="navigation-link"
                    exact
                    activeClassName={"navigation-link-selected"}
                    to="/eventos-agregados"
                >
                    EVENTOS AGREGADOS
                </NavLink>
            </li>
        </ul>
    );
};

export default ClientOptions;