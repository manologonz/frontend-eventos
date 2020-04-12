import {connect} from "react-redux"
import {editar, leer, changeFormValue, setTalleresValue} from "../../../../redux/modules/eventos/eventos"
import EventoEditar from "./EventoEditar";


const ms2p = (state) => {
    const {imagen_evento} = state.eventos.item
    const { form } = state
    return {
        ...state.eventos,
        imagen_evento,
        form,
    }
}

const ma2p = {editar, leer, changeFormValue, setTalleresValue}


export default connect(ms2p, ma2p)(EventoEditar)