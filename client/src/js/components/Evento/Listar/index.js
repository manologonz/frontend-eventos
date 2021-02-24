import {connect} from "react-redux"
import {listar, clearFilters} from "../../../../redux/modules/eventos/eventos"
import EventoListar from "./EventoListar"

const ms2p = (state) => {
    return {
        ...state.eventos,
    }
}

const ma2p = { listar, clearFilters }

export default connect(ms2p, ma2p)(EventoListar)