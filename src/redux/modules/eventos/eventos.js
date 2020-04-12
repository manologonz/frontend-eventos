import {push} from "react-router-redux";
import {handleActions} from "redux-actions"
import {change, initialize as initializeForm} from 'redux-form';
import axios from "axios"
import {NotificationManager} from "react-notifications";
import {base_url, getRequestHeaders} from "../../../utility/variables"
import moment from "moment";

const storeId = "eventos"
const endpoint = "evento"
const formName = "EventoForm"
const resourceList = "/mis-eventos"


// ------------------------------------
// Constants
// ------------------------------------

const constants = {
    LOADER: "EVENTOS_LOADER",
    DATA: "EVENTOS_DATA",
    APPEND_DATA: "EVENTOS_APPEND_DATA",
    ITEM: "EVENTOS_ITEM",
    PAGE: "EVENTOS_PAGE",
    ORDERING: "EVENTOS_ORDERING",
    SEARCH: "EVENTOS_SEARCH",
    EVENTOS_HOY: "EVENTOS_HOY_LIST",
    TALLERES: "EVENTOS_TALLERES_LIST",
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

const appendData = data => ({
    type: constants.APPEND_DATA,
    data,
});

const setEventosHoy = eventosDeHoy => ({
    type: constants.EVENTOS_HOY,
    eventosDeHoy,
});

const setItem = item => ({
    type: constants.ITEM,
    item,
});

const setTalleres = talleres => ({
    type: constants.TALLERES,
    talleres,
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

export const changeFormValue = (field, value) => (dispatch) => {
    dispatch(change(formName, field, value))
};

export const clearFilters = () => (dispatch) => {
    dispatch(initializeForm("EventoListar", {}))
}

export const loadFormData = (data) => (dispatch) => {
    dispatch(initializeForm(formName, data))
}

export const listar = (page = 1, date_range=null, categoria="", append=false) => (dispatch, getStore) => {
    const config = {
        headers: getRequestHeaders()
    }
    let fecha_after = "", fecha_before = "";
    if(!!date_range && date_range.fecha_before !== "" && date_range.fecha_after !== ""){
        fecha_before = date_range.fecha_before
        fecha_after = date_range.fecha_after
    }
    dispatch(setLoader(true));
    axios.get(`${base_url}/${endpoint}/?page=${page}&fecha_before=${fecha_before}&fecha_after=${fecha_after}&categoria=${categoria}&ordering=fecha`, config).then(response => {
        if(append){
            dispatch(appendData(response.data));
        } else {
            dispatch(setData(response.data))
        }
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const listUserEvents = (page = 1, admin, date_range=null, categoria="", append=false) => (dispatch, getStore) => {
    const config = {
        headers: getRequestHeaders()
    }
    let fecha_after = "", fecha_before = "";
    if(!!date_range && date_range.fecha_before !== "" && date_range.fecha_after !== ""){
        fecha_before = date_range.fecha_before
        fecha_after = date_range.fecha_after
    }
    dispatch(setLoader(true));
    axios.get(`${base_url}/${endpoint}/?page=${page}&admin=${admin}&fecha_before=${fecha_before}&fecha_after=${fecha_after}&categoria=${categoria}&ordering=fecha`, config).then(response => {
        if(append){
            dispatch(appendData(response.data));
        } else {
            dispatch(setData(response.data))
        }
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const listarHoy = () => (dispatch) => {
    const config = {
        headers: getRequestHeaders()
    }
    dispatch(setLoader(true));
    axios.get(`${base_url}/${endpoint}/eventos_hoy/`, config,).then(response => {
        dispatch(setEventosHoy({results:  response.data}));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const leer = (id, write=false) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.get(`${base_url}/${endpoint}/${id}`, config).then(response => {
        const talleres = {
            results:[]
        }
        dispatch(setItem(response.data));
        response.data.talleres.forEach(taller => {
            talleres.results.push(
                {...taller.det_taller})
        })
        dispatch(setTalleres(talleres))
        if(!!write && !!formName){
            const fecha = moment(response.data.fecha).format("DD/MM/YYYY")
            const hora = moment(response.data.fecha+" "+response.data.hora).format("hh:mm")
            dispatch(initializeForm(formName, {
                ...response.data,
                hora: hora
            }))
        }
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const setTalleresValue = (talleres) => (dispatch) => {
    dispatch(setTalleres(talleres))
}

export const crear = (data, attachments) => (dispatch) => {
    dispatch(setLoader(true));
    let formData = new FormData();
    attachments.forEach((attachment) => {
        formData.append(attachment.name, attachment.value)
    })
    formData.append("data", JSON.stringify(data))
    const config = {
        headers: getRequestHeaders("multipart")
    }
    axios.post(`${base_url}/${endpoint}/`, formData, config).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editar = (id, data, attachments) => (dispatch) => {
    dispatch(setLoader(true));
    let formData = new FormData();
    attachments.forEach((attachment) => {
        formData.append(attachment.name, attachment.value)
    })
    formData.append("data", JSON.stringify(data))
    const config = {
        headers: getRequestHeaders("multipart")
    }
    axios.put(`${base_url}/${endpoint}/${id}`, formData, config).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
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
    axios.delete(`${base_url}/${endpoint}/${id}`, config).then(() => {
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

export const onPageChange = (page) => (dispatch) => {
    dispatch(setPage(page))
}

export const actions = {
    listar,
    listUserEvents,
    listarHoy,
    changeFormValue,
    loadFormData,
    clearFilters,
    setTalleresValue,
    leer,
    crear,
    editar,
    eliminar,
    searchChange,
    onSortChange,
    onPageChange,
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
            data
        };
    },
    [constants.TALLERES]: (state, {talleres}) => {
        return {
            ...state,
            talleres
        };
    },
    [constants.APPEND_DATA]: (state, {data}) => {
        return {
            ...state,
            data: {
                ...data,
                results: state.data.results.concat(data.results)
            },
        };
    },
    [constants.EVENTOS_HOY]: (state, {eventosDeHoy}) => {
        return {
            ...state,
            eventosDeHoy,
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
    eventosDeHoy: {
        results:[]
    },
    talleres: {
        results:[]
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};


export default handleActions(reducers, initialState);