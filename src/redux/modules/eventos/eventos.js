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
    USER_TALLERES: "EVENTOS_USER_TALLERES_LIST",
    USER_EVENTOS: "EVENTOS_USER_EVENTOS_LIST",
    INSCRITO_EVENTOS: "EVENTOS_INSCRITO_EVENTOS_LIST",
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

const setInscritoList = inscrito_list => ({
    type: constants.INSCRITO_EVENTOS,
    inscrito_list,
});

const setUserTalleres = user_talleres => ({
    type: constants.USER_TALLERES,
    user_talleres,
});

const setUserEventos = user_eventos => ({
    type: constants.USER_EVENTOS,
    user_eventos,
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

export const loadFormDataAny = (form, data) => (dispatch) => {
    dispatch(initializeForm(form, data))
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
export const listarEventosInscrito = () => (dispatch, getStore) => {
    const config = {
        headers: getRequestHeaders()
    }
    dispatch(setLoader(true));
    axios.get(`${base_url}/evento/mis_eventos/`, config).then(response => {
        dispatch(setInscritoList(response.data))
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
export const crearTaller = (evento, data) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/evento/${evento}/agregar_talleres/`, data, config).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(leer(evento));
        dispatch(initializeForm("TallerForm", {}));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const editarEvento = (id, data, attachments) => (dispatch) => {
    dispatch(setLoader(true));
    let formData = new FormData();
    attachments.forEach((attachment) => {
        formData.append(attachment.name, attachment.value)
    })
    formData.append("data", JSON.stringify(data))
    const config = {
        headers: getRequestHeaders("multipart")
    }
    axios.put(`${base_url}/${endpoint}/${id}/`, formData, config).then(() => {
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
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
        dispatch(push("/mis-eventos"));
    }).catch(() => {
        NotificationManager.error('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const eliminarTaller = (evento, taller) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.delete(`${base_url}/evento/${evento}/taller/${taller}/`, config).then(() => {
        dispatch(leer(evento))
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getUserTalleres = () => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.get(`${base_url}/evento/get_user_talleres/`, config).then(response => {
        dispatch(setUserTalleres(response.data))
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const getUserEventos = () => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.get(`${base_url}/evento/get_user_eventos/`, config).then(response => {
        dispatch(setUserEventos(response.data))
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const inscribirseEvento = (evento) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/evento/${evento}/registro/`,{}, config).then(response => {
        dispatch(leer(evento))
        dispatch(getUserEventos())
        NotificationManager.success('Inscripcion realizada con exito', 'Éxito', 3000);
    }).catch((err) => {
        if(!!err.response.data.detail){
            NotificationManager.error(err.response.data.detail, 'Error', 3000);
        } else {
            NotificationManager.error("Error en la inscripción", 'Error', 3000);
        }
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const inscribirseTaller = (evento, taller) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/evento/${evento}/taller/${taller}/registro/`,{}, config).then(response => {
        dispatch(getUserTalleres())
        NotificationManager.success('Inscripcion realizada con exito', 'Éxito', 3000);
    }).catch((err) => {
        if(!!err.response.data.detail){
            NotificationManager.error(err.response.data.detail, 'Error', 3000);
        } else {
            NotificationManager.error("Error en la inscripción", 'Error', 3000);
        }
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const bajaEvento = (evento) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/evento/${evento}/darse_de_baja/`,{}, config).then(response => {
        dispatch(leer(evento))
        dispatch(getUserEventos())
        dispatch(getUserTalleres())
        NotificationManager.success('inscripcion cancelada realizada con exito', 'Éxito', 3000);
    }).catch((err) => {
        if(!!err.response.data.detail){
            NotificationManager.error(err.response.data.detail, 'Error', 3000);
        } else {
            NotificationManager.error("Error en la inscripción", 'Error', 3000);
        }
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

export const bajaTaller = (evento, taller) => (dispatch) => {
    dispatch(setLoader(true));
    const config = {
        headers: getRequestHeaders()
    }
    axios.post(`${base_url}/evento/${evento}/taller/${taller}/darse_de_baja/`,{}, config).then(response => {
        dispatch(getUserTalleres())
        NotificationManager.success('inscripcion cancelada realizada con exito', 'Éxito', 3000);
    }).catch((err) => {
        if(!!err.response.data.detail){
            NotificationManager.error(err.response.data.detail, 'Error', 3000);
        } else {
            NotificationManager.error("Error en la inscripción", 'Error', 3000);
        }
    }).finally(() => {
        dispatch(setLoader(false));
    });
}

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
    listarEventosInscrito,
    getUserEventos,
    getUserTalleres,
    changeFormValue,
    loadFormData,
    loadFormDataAny,
    clearFilters,
    setTalleresValue,
    leer,
    crear,
    crearTaller,
    editarEvento,
    eliminar,
    eliminarTaller,
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
    [constants.INSCRITO_EVENTOS]: (state, {inscrito_list}) => {
        return {
            ...state,
            inscrito_list
        };
    },
    [constants.USER_TALLERES]: (state, {user_talleres}) => {
        return {
            ...state,
            user_talleres
        };
    },
    [constants.USER_EVENTOS]: (state, {user_eventos}) => {
        return {
            ...state,
            user_eventos
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
    inscrito_list:[],
    user_talleres:[],
    user_eventos:[],
    item: {},
    page: 1,
    ordering: '',
    search: '',
};


export default handleActions(reducers, initialState);