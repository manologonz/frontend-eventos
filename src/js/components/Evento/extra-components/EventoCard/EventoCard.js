import React from 'react';
import {monthArray} from "../../../../../utility/variables";
import {Link} from "react-router-dom";
import moment from "moment";

const EventoCard = (props) => {
    const {evento, isAdmin} = props
    return (
        <div key={evento.id} className="event-card d-flex">
            <div className="time">
                <h2>
                    {moment(evento.fecha).date()}
                    <br/>
                    <span>{monthArray[moment(evento.fecha).month()]}</span>
                </h2>
            </div>
            <div className="details">
                <h3>{evento.titulo}</h3>
                <span className="info">Lugar: {evento.lugar}</span>
                <span className="info">Fecha: {moment(evento.fecha).format("DD/MM/YYYY")}</span>
                <p>{evento.descripcion}</p>
                {
                    (!!isAdmin) ? (
                        <Link
                            to={`/eventos/${evento.id}/editar`}
                            className="mas-informacion-link" href="#"
                        >
                            Editar
                        </Link>) : (
                        <Link
                            to={`/eventos/${evento.id}/detail`}
                            className="mas-informacion-link" href="#"
                        >
                            Mas informacion
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default EventoCard;
