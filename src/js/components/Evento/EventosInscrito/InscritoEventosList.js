import React from 'react';
import EventoCard from "../extra-components/EventoCard/EventoCard";
import {Link} from "react-router-dom";

const InscritoEventosList = (props) => {
    const {eventos, isAdmin} = props
    return (
        <div className="h-100">
            {(!!eventos && eventos.length > 0) ? eventos.map((registro) => {
                return (
                    <EventoCard key={registro.reg_evento.id} isAdmin={isAdmin} evento={registro.reg_evento}/>
                )
            }) : (
                <li className="no-eventos-found-container d-flex justify-content-center mt-3">
                    <div className="text-center">
                        <p className="clr-black">No tiene eventos agregados.</p>
                        <div className="d-flex justify-content-center">
                            <Link to="/eventos-list" className="no-eventos-found-link">
                                Explorar
                            </Link>
                        </div>
                    </div>
                </li>
            )
            }
        </div>
    );
};

export default InscritoEventosList;
