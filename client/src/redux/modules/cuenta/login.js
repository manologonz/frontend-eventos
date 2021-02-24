import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import axios from "axios"
import { base_url, getRequestHeaders } from "../../../utility/variables"

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';

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

export const setMe = me => ({
    type: ME,
    me,
});

// ------------------------------------
// Actions
// ------------------------------------

export const login = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/user/login/`, data, config).then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch(setMe(response.data.user));
        dispatch(push("/"));
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch) => {
    const token = localStorage.getItem("token");
    const authHeaders = {
        headers: {
            Authorization: `Token ${token}`
        }
    };
    axios.get(`${base_url}/user/me`, authHeaders).then(response => {
        dispatch(setMe(response.data));
    }).catch(() => {
        }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    const config = {
        headers: getRequestHeaders()
    };
    axios.post(`${base_url}/user/logout/`,{}, config).then(() => {
        dispatch(setMe({}))
    }).catch(() => {
    }).finally(() => {});
    localStorage.removeItem('token');
};


export const actions = {
    login,
    logOut,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState);