import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import axios from "axios"
import {base_url} from "../../../utility/variables";

const SUBMIT = 'REGISTER_SUBMIT';
const LOADER = 'REGISTER_LOADER';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

// ------------------------------------
// Actions
// ------------------------------------

export const registrar = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    axios.post(`${base_url}/user/`, data).then(() => {
        NotificationManager.success('Cuenta creada con éxito, puedes iniciar sesión', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
};


export const actions = {
    registrar,
    logOut,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);