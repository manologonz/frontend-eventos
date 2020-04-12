import React from 'react';
import moment from "moment";
import {Link, NavLink} from "react-router-dom";
import {monthArray} from "../../../utility/variables";
import EventoCard from "../Evento/extra-components/EventoCard/EventoCard";

const MainViewEventosList = (props) => {
    const {eventos, page} = props;
    console.log("LISTA EVENTOS", eventos);
    return (
        <div className="h-100">
            <div className="event-container">
                {(!!eventos && eventos.results.length > 0) ? (eventos.results.map((evento) => {
                    return (
                        <EventoCard evento={evento}/>
                    )
                }) ): (
                    <li className="no-eventos-found-container d-flex justify-content-center">
                        <div>
                            <p>No hay eventos agendados para el dia de hoy.</p>
                            <div className="d-flex justify-content-center">
                                <Link to="/eventos-list" className="no-eventos-found-link">
                                    Todos los eventos
                                </Link>
                            </div>
                        </div>
                    </li>
                )
                }
            </div>
        </div>
    );
};

export default MainViewEventosList;
