import {connect} from "react-redux"
import {
    editarEvento,
    leer,
    changeFormValue,
    setTalleresValue,
    eliminarTaller,
    crearTaller,
    eliminar
} from "../../../../redux/modules/eventos/eventos"
import EventoEditar from "./EventoEditar";


const ms2p = (state) => {
    const {imagen_evento} = state.eventos.item
    const {form} = state
    return {
        ...state.eventos,
        imagen_evento,
        form,
    }
}

const ma2p = {editarEvento, leer, changeFormValue, setTalleresValue, eliminarTaller, crearTaller, eliminar}


export default connect(ms2p, ma2p)(EventoEditar)