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
                            Bienvenido a SAC, Sistema de Administración de Capacitaciones, para nosotros el aprender
                            nuevas habilidades es algo importante que define el éxito de una persona, por esa misma
                            razón es que SAC existe, para brindar un servicio en el cual puedas estar al tanto de todas
                            las actividades de aprendizaje y superación personal que estan disponibles en todo el país,
                            ven y aprendamos juntos
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