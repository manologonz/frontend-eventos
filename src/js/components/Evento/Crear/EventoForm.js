import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber, renderTextArea} from "../../../utils/renderField";
import {combine, validate, validatorFromFunction, validators} from "validate-redux-form";
import {
    AsyncSelectField,
    renderDayPicker,
    renderFilePicker
} from "../../../utils/renderField/renderField";
import {getCategorias} from "../../../../utility/variables";
import {TableHeaderColumn} from "react-bootstrap-table"
import Grid from "../../../utils/Grid";
import Add from "../../../../assets/img/action-icons/add-icon.png"
import {tableHeader, tableBody} from "../../../../style/table-styles"


const EventoForm = (props) => {
    const {handleSubmit, talleres, onTallerAgregar, onAddCategoriaClick, eliminarTaller, setFile,
        imagen_evento} = props;
    return (
        <form name="EventoForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="d-flex p-3">
                <div className="form-column mr-2">
                    <div className="col-md-12">
                        <h2>Información del evento</h2>
                        <hr/>
                    </div>
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
                <div className="form-column ml-2">
                    <div className="col-md-12">
                        <h2>Administración de talleres</h2>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="nombre">
                            Nombre del taller<span className="required-field">*</span>
                        </label>
                        <Field
                            name="nombre"
                            component={renderField}
                            type="text"
                            placeholder="¿Sobre que trata el taller?"
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="capacitador">
                            Capacitador<span className="required-field">*</span>
                        </label>
                        <Field
                            name="capacitador"
                            component={renderField}
                            type="text"
                            placeholder="¿Quien impartira el taller?"
                        />
                    </div>
                    <div className="col-md-12 mt-3">
                        <button
                            onClick={onTallerAgregar} type="button" className="btn btn-info w-100 make-bold">
                            AGREGAR TALLER
                        </button>
                    </div>
                    <div className="col-md-12 mt-3">
                        <Grid
                            data={talleres}
                            pagination={false}
                            tableHeaderClass="table-header"
                            bodyContainerClass="table-body"
                            headerStyle={tableHeader}
                            bodyStyle={tableBody}
                        >
                            <TableHeaderColumn
                                width='20%'
                                dataField="id"
                                dataFormat={(cell) => (
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                        <a
                                            className="px-2"
                                            style={{cursor: "pointer", color: "#c4183c"}}
                                            onClick={() => {eliminarTaller(cell)}}
                                        >
                                            <i className="material-icons">delete</i>
                                        </a>
                                    </div>
                                )}
                            >
                                ACCIONES
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                isKey
                                dataField="nombre"
                            >
                                TALLER
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="capacitador"
                            >
                                CAPACITADOR
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                    <div className="col-md-12 mt-4 make-bold">
                        <button type="submit" className="btn btn-success btn-evento-height w-100">CREAR EVENTO</button>
                    </div>
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
})(EventoForm);