import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import axios from "axios"
import { NotificationManager } from "react-notifications";
import {requestHeaders, base_url} from "../../../utility/variables"

const token = localStorage.getItem("token");
const withAuthHeaders = {
    headers: {
        ...requestHeaders.headers,
        Authorization: `Token ${token}`
    }
};

export const createReducer = (storeId, endpoint, formName=undefined, resourceList=undefined) => {

    // ------------------------------------
    // Constants
    // ------------------------------------

    const constants = {
        LOADER: `${storeId.toUpperCase()}_LOADER`,
        DATA: `${storeId.toUpperCase()}_DATA`,
        ITEM: `${storeId.toUpperCase()}_ITEM`,
        PAGE: `${storeId.toUpperCase()}_PAGE`,
        ORDERING: `${storeId.toUpperCase()}_ORDERING`,
        SEARCH: `${storeId.toUpperCase()}_SEARCH`,
    };

    // -----------------------------------
    // Pure Actions
    // -----------------------------------

    const setLoader = loader => ({
        type: constants.LOADER,
        loader,
    });

    const setData = data => ({
        type: constants.DATA,
        data,
    });

    const setItem = item => ({
        type: constants.ITEM,
        item,
    });

    const setPage = page => ({
        type: constants.PAGE,
        page,
    });

    const setOrdering = ordering => ({
        type: constants.ORDERING,
        ordering,
    });

    const setSearch = search => ({
        type: constants.SEARCH,
        search,
    });

    // -----------------------------------
    // Actions
    // -----------------------------------

    const listar = (page = 1) => (dispatch, getStore) => {
        const resource = getStore()[storeId];
        const params = { page };
        params.ordering = resource.ordering;
        params.search = resource.search;
        dispatch(setLoader(true));
        axios.get(`${base_url}/${endpoint}`, withAuthHeaders).then(response => {
            dispatch(setData(response));
            dispatch(setPage(page));
        }).catch(() => {
        }).finally(() => {
            dispatch(setLoader(false));
        });
    };

    const leer = id => (dispatch) => {
        dispatch(setLoader(true));
        axios.get(`${base_url}/${endpoint}/${id}`, withAuthHeaders).then(response => {
            dispatch(setItem(response));
            if (!!formName)
                dispatch(initializeForm(formName, response));
        }).catch(() => {
        }).finally(() => {
            dispatch(setLoader(false));
        });
    };

    const crear = data => (dispatch) => {
        dispatch(setLoader(true));
        axios.post(`${base_url}/${endpoint}`, data, withAuthHeaders).then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);
            if (!!resourceList)
                dispatch(push(resourceList));
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR');
        }).finally(() => {
            dispatch(setLoader(false));
        });
    };

    const editar = (id, data) => (dispatch) => {
        dispatch(setLoader(true));
        axios.put(`${base_url}/${endpoint}/${id}`, data, withAuthHeaders).then(() => {
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
            if (!!resourceList)
                dispatch(push(resourceList));
        }).catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        }).finally(() => {
            dispatch(setLoader(false));
        });
    };

    const eliminar = id => (dispatch) => {
        dispatch(setLoader(true));
        axios.delete(`${base_url}/${endpoint}/${id}`, withAuthHeaders).then(() => {
            dispatch(listar());
            NotificationManager.success('Registro eliminado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.success('Error en la transacción', 'Éxito', 3000);
        }).finally(() => {
            dispatch(setLoader(false));
        });
    };

    const searchChange = search => (dispatch) => {
        dispatch(setSearch(search));
        dispatch(listar());
    };

    const onSortChange = ordering => (dispatch, getStore) => {
        const sort = getStore()[storeId].ordering;
        if (ordering === sort) {
            dispatch(setOrdering(`-${ordering}`));
        } else {
            dispatch(setOrdering(ordering));
        }
        dispatch(listar());
    };

    const actions = {
        listar,
        leer,
        crear,
        editar,
        eliminar,
        searchChange,
        onSortChange,
    };

    // -----------------------------------
    // Reducers
    // -----------------------------------

    const reducers = {
        [constants.LOADER]: (state, { loader }) => {
            return {
                ...state,
                loader,
            };
        },
        [constants.DATA]: (state, { data }) => {
            return {
                ...state,
                data,
            };
        },
        [constants.ITEM]: (state, { item }) => {
            return {
                ...state,
                item,
            };
        },
        [constants.PAGE]: (state, { page }) => {
            return {
                ...state,
                page,
            };
        },
        [constants.ORDERING]: (state, { ordering }) => {
            return {
                ...state,
                ordering,
            };
        },
        [constants.SEARCH]: (state, { search }) => {
            return {
                ...state,
                search,
            };
        },
    };

    const initialState = {
        loader: false,
        data: {
            results: [],
            count: 0,
        },
        item: {},
        page: 1,
        ordering: '',
        search: '',
    };

    return { reducers, initialState, actions };

};