import {connect} from "react-redux"
import {leer, editar} from "../../../../redux/modules/usuarios/usuarios"
import UsuarioEditar from "./UsuarioEditar"

const ms2p = (state) => {
    const { me: user } = state.login
    return {  user }
}

const ma2p = {leer, editar}

export default connect(ms2p, ma2p)(UsuarioEditar)