import {connect} from "react-redux"
import {leer} from "../../../../redux/modules/eventos/eventos"
import EventoDetalle from "./EventoDetalle";

const ms2p = (state) => {
    return {
        ...state.eventos,
    }
}

const ma2p = {leer}

export default connect(ms2p, ma2p)(EventoDetalle)