import {push} from "react-router-redux";
import {handleActions} from "redux-actions"
import {initialize as initializeForm} from 'redux-form';
import axios from "axios"
import {NotificationManager} from "react-notifications";
import {getRequestHeaders, base_url} from "../../../utility/variables"

const storeId = "categorias"
const endpoint = "categoria"
const formName = "CategoriaForm"
const resourceList = "#"


// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: "CATEGORIA_LOADER",
    DATA: "CATEGORIA_DATA",
    ITEM: "CATEGORIA_ITEM",
    PAGE: "CATEGORIA_PAGE",
    ORDERING: "CATEGORIA_ORDERING",
    SEARCH: "CATEGORIA_SEARCH",
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

export const listar = (page = 1) => (dispatch, getStore) => {
    const config = {
        headers: getRequestHeaders()
    }
    dispatch(setLoader(true));
    axios.get(`${base_url}/${endpoint}/page=${page}`, config).then(response => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.get(`${base_url}/${endpoint}/${id}/`, config).then(response => {
        dispatch(setItem(response));
        if (!!formName)
            dispatch(initializeForm(formName, response));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const crear = data => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/${endpoint}/`, data, config).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editar = (id, data) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.put(`${base_url}/${endpoint}/${id}/`, data, config).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

 export const eliminar = id => (dispatch) => {
    dispatch(setLoader(true));
     const config = {
         headers: getRequestHeaders()
     }
    axios.delete(`${base_url}/${endpoint}/${id}/`, config).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const searchChange = search => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};

export const onSortChange = ordering => (dispatch, getStore) => {
    const sort = getStore()[storeId].ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};

export const actions = {
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
    [constants.LOADER]: (state, {loader}) => {
        return {
            ...state,
            loader,
        };
    },
    [constants.DATA]: (state, {data}) => {
        return {
            ...state,
            data,
        };
    },
    [constants.ITEM]: (state, {item}) => {
        return {
            ...state,
            item,
        };
    },
    [constants.PAGE]: (state, {page}) => {
        return {
            ...state,
            page,
        };
    },
    [constants.ORDERING]: (state, {ordering}) => {
        return {
            ...state,
            ordering,
        };
    },
    [constants.SEARCH]: (state, {search}) => {
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


export default handleActions(reducers, initialState);