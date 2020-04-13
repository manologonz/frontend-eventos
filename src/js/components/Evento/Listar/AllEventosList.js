import React from 'react';
import EventoCard from "../extra-components/EventoCard/EventoCard";

const AllEventosList = (props) => {
    const {eventos, page, isAdmin, onPageChange} = props
    return (
        <div className="h-100">
                {(!!eventos && eventos.results.length > 0) ? eventos.results.map((evento) => {
                    return (
                        <EventoCard key={evento.id} isAdmin={isAdmin} evento={evento}/>
                    )
                }) : (
                    <li className="no-eventos-found-container d-flex justify-content-center">
                        <div>
                            <p className="clr-black">No se encontraron eventos con los criterios de busqueda seleccionados.</p>
                        </div>
                    </li>
                )
                }
            {(!!eventos && !!eventos.next) ? (
                <button onClick={() => {onPageChange(page+1)}} className="cargar-mas">
                    Cargar mas..
                </button> ) : null
            }

        </div>
    );
};

export default AllEventosList;
