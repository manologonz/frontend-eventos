import {createReducer} from "../baseReducer/baseReducer"
import {handleActions} from "redux-actions";

export const { reducers, initialState, actions } = createReducer(
    "eventos",
    "evento",
    "EventoForm",
    "/"
);

export default handleActions(reducers, initialState);