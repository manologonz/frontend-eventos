import React from 'react';
import {NavLink} from "react-router-dom";

const ClientOptions = () => {
    return (
        <ul className="nav-list">
            <li className="nav-item">
                <NavLink to="/" className="nav-inside-link" activeClassName={"active-inside-link"}>Inicio</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/eventos">Mis Eventos</NavLink>
            </li>
        </ul>
    );
};

export default ClientOptions;