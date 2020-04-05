import React from 'react';
import {NavLink} from "react-router-dom";

const AdminOptions = () => {
    return (
        <ul className="nav-list">
            <li className="nav-item">
                <NavLink to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/crear-evento">Crear Evento</NavLink>
            </li>
        </ul>
    );
};

export default AdminOptions;