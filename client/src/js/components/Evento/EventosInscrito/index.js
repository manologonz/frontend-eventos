import {connect} from "react-redux"
import { listarEventosInscrito } from "../../../../redux/modules/eventos/eventos";
import EventosInscrito from "./EventosInscrito"


const ms2p = (state) => {
    return {
        ...state.eventos,
    }
}

const ma2p = {listarEventosInscrito}

export default connect(ms2p, ma2p)(EventosInscrito)