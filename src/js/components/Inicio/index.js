import { connect } from "react-redux"
import { listarHoy } from "../../../redux/modules/eventos/eventos"
import Inicio from "./Inicio";

const ms2p = (state) => {
    return {
        ...state.eventos,
    }
}

const ma2p = {listarHoy}

export default connect(ms2p, ma2p)(Inicio)