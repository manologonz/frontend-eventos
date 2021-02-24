import { connect } from "react-redux"
import { actions } from "../../../../redux/modules/eventos/eventos"
import { crear as categoriaCrear } from "../../../../redux/modules/categorias/categorias"
import EventoCrear from "./EventoCrear"

const ms2p = (state) => {
    const {form} = state
    return {
        ...state.eventos,
        form
    }
};

const ma2p = { ...actions, categoriaCrear };

export default connect(ms2p, ma2p)(EventoCrear)