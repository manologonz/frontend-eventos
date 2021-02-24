import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import notificaciones from './modules/notificaciones/notificaciones';
import login from "./modules/cuenta/login";
import registrar from "./modules/cuenta/registrar";
import eventos from "./modules/eventos/eventos"
import categorias from "./modules/categorias/categorias"

export default combineReducers({
    form: formReducer,
    login,
    registrar,
    eventos,
    categorias,
    routing,
    notificaciones,
});
