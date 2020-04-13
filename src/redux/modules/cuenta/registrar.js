import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import axios from "axios"
import {base_url} from "../../../utility/variables";
import {initialize as initializeForm} from "redux-form";

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

export const loadFormData = (data) => (dispatch) => {
    dispatch(initializeForm("registro", data))
}

export const registrar = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    axios.post(`${base_url}/user/`, data).then(() => {
        dispatch(initializeForm("registro", {}))
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
    loadFormData,
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