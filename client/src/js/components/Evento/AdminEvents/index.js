import {connect} from "react-redux"
import {listUserEvents, listar} from "../../../../redux/modules/eventos/eventos"
import AdminEvents from "./AdminEvents"

const ms2p = (state) => {
    return {
        ...state.eventos
    }
}

const ma2p = {listUserEvents, listar}

export default connect(ms2p, ma2p)(AdminEvents)