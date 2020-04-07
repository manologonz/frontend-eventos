import { connect } from "react-redux"
import { actions } from "../../../../redux/modules/eventos/eventos"
import EventoCrear from "./EventoCrear"

const ms2p = (state) => {
    return {
        ...state.eventos,
    }
};

const ma2p = { ...actions };

export default connect(ms2p, ma2p)(EventoCrear)