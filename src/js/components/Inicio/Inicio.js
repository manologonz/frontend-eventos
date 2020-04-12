import React, {Component} from 'react';
import MainViewEventosList from "./MainViewEventosList";
import LoadMask from "../../utils/LoadMask/LoadMask";
import moment from "moment";
class Inicio extends Component {
    componentDidMount() {
        const {listarHoy} = this.props;
        listarHoy()
    }

    render() {
        const {page, data, eventosDeHoy} = this.props
        return (
            <main className="main-section">
                <div className="leftBox">
                    <div className="content">
                        <h1>Eventos y Capacitaciones</h1>
                        <p>
                            No te pierdas ni un minuto del mágico concierto en línea con canciones de reconocidas
                            películas Disney.
                            Estará a cargo de los talentosos miembros del Coro Nacional de Guatemala.
                            Lo que podrás ver desde tu casa será una grabación de unos de los conciertos que el Coro
                            Nacional ha brindado.
                            Los mismos han tenido lugar en la Gran Sala Efraín Recinos del Centro Cultural Miguel Ángel
                            Asturias.
                            ¡Muchos guatemaltecos han tenido la oportunidad de disfrutarlos y ahora aún más!

                        </p>
                    </div>
                </div>
                <div className="event">
                    <header className="principal-eventos-header">
                        <h1 className="principal-eventos-title">Eventos de hoy</h1>
                    </header>
                    <MainViewEventosList eventos={eventosDeHoy} page={page}/>
                </div>
            </main>
        );
    }
}

export default Inicio;