import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber, renderTextArea} from "../../../utils/renderField";
import {validate, validators, combine, validatorFromFunction} from "validate-redux-form";
import {
    AsyncSelectField,
    renderDayPicker,
    renderFilePicker
} from "../../../utils/renderField/renderField";
import {getCategorias} from "../../../../utility/variables";
import Add from "../../../../assets/img/action-icons/add-icon.png"


const EventoEditarForm = (props) => {
    const {handleSubmit, onAddCategoriaClick, setFile,
        imagen_evento} = props;
    return (
        <form name="EventoEditarForm" className="form-column mr-2 form-validate mb-lg" onSubmit={handleSubmit}>
                <div>
                    <div className="col-md-12 d-flex justify-content-between">
                        <h2>Información del evento</h2>
                        <input type="submit" className="btn btn-success make-bold" value="GUARDAR CAMBIOS"/>
                    </div>
                    <hr/>
                    <div className="col-md-12">
                        <label htmlFor="titulo">
                            Nombre del evento<span className="required-field">*</span>
                        </label>
                        <Field
                            name="titulo"
                            component={renderField}
                            type="text"
                            placeholder="¿Como se llama tu evento?"/>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-6 pl-0">
                            <label htmlFor="limite_participantes_evento" className="m-0 pr-2">
                                Limite participantes<span className="required-field">*</span>
                            </label>
                            <Field
                                name="limite_participantes_evento"
                                component={renderNumber}
                                type="number"
                                placeholder="¿Cuantas personas pueden asistir?"
                            />
                        </div>
                        <div className="col-md-6 pr-0">
                            <label htmlFor="limite_participantes_talleres" className="m-0 pr-2">
                                Limite talleres<span className="required-field">*</span>
                            </label>
                            <Field
                                name="limite_participantes_talleres"
                                component={renderNumber}
                                type="number"
                                placeholder="¿Cuantos talleres se pueden asignar?"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex p-0">
                        <div className="col-md-11 mt-3">
                            <label htmlFor="categoria">
                                Categoria
                            </label>
                            <Field
                                name="categoria"
                                isClearable={true}
                                component={AsyncSelectField}
                                loadOptions={getCategorias}
                                placeholder="¿Cual es la tematica?"
                                getOptionLabel={(option) => (option["nombre"])}
                                getOptionValue={(option) => (option["id"])}
                            />
                        </div>
                        <div className="col-md-1 d-flex align-items-end mb-2">
                            <img
                                className="add-categoria-icon"
                                onClick={onAddCategoriaClick}
                                alt="agregar categoria icono"
                                src={Add}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-6 pl-0">
                            <label htmlFor="fecha">
                                Fecha<span className="required-field">*</span>
                                <small className="make-regular"> (DD-MM-YYYY)</small>
                            </label>
                            <Field
                                name="fecha"
                                component={renderDayPicker}
                                placeholder="¿En donde se va a realizar?"
                            />
                        </div>
                        <div className="col-md-6 pr-0">
                            <label htmlFor="hora">
                                Hora<span className="required-field">*</span>
                                <small className="make-regular"> (HH:mm)</small>
                            </label>
                            <Field
                                name="hora"
                                className="form-control"
                                component={renderField}
                                placeholder="¿En donde se va a realizar?"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="lugar">
                            Dirección<span className="required-field">*</span>
                        </label>
                        <Field
                            name="lugar"
                            component={renderField}
                            type="text"
                            placeholder="¿En donde se va a realizar?"
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="descripcion">
                            Descripción
                            <span className="required-field">*</span>
                            <small className="make-regular"> (500 caracteres max.)</small>
                        </label>
                        <Field
                            name="descripcion"
                            component={renderTextArea}
                            type="text"
                            placeholder="Cuentanos un poco sobre la dinamica del evento."
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="imagen_evento">Cargar Imagen</label>
                        <Field
                            name="imagen_evento"
                            setFile={setFile}
                            photo={imagen_evento ? imagen_evento : null}
                            component={renderFilePicker}
                        />
                    </div>
                </div>
        </form>
    );
};

export const validHour = (hora) => validatorFromFunction(value => {
    return hora.match(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/);
});

export default reduxForm({
    form: 'EventoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            titulo: validators.exists()('Este campo es requerido'),
            limite_participantes_evento: validators.exists()('Este campo es requerido'),
            limite_participantes_talleres: validators.exists()('Este campo es requerido'),
            fecha: validators.exists()('Este campo es requerido'),
            hora: combine(
                validators.exists()('Este campo es requerido'),
                validHour(data.hora)()('Ingrese un formato valido')
            ),
            lugar: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
        });
    },
})(EventoEditarForm);