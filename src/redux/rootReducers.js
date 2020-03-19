import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import notificaciones from './modules/notificaciones/notificaciones';
import login from "./modules/cuenta/login";

export default combineReducers({
    form: formReducer,
    login,
    routing,
    notificaciones,
});
