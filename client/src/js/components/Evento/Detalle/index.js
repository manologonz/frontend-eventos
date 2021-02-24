import {connect} from "react-redux"
import {
    leer,
    getUserTalleres,
    getUserEventos,
    inscribirseEvento,
    inscribirseTaller,
    bajaEvento,
    bajaTaller,
} from "../../../../redux/modules/eventos/eventos"
import EventoDetalle from "./EventoDetalle";

const ms2p = (state) => {
    return {
        ...state.eventos,
    }
}

const ma2p = {
    leer, getUserTalleres, getUserEventos, inscribirseEvento, inscribirseTaller, bajaEvento, bajaTaller,
}

export default connect(ms2p, ma2p)(EventoDetalle)