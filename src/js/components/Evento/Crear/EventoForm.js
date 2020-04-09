import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber, renderTextArea} from "../../../utils/renderField";
import {validate, validators} from "validate-redux-form";
import {AsyncSelectField, renderFilePicker} from "../../../utils/renderField/renderField";
import {getCategorias} from "../../../../utility/variables";
import {TableHeaderColumn} from "react-bootstrap-table"
import Grid from "../../../utils/Grid";
import {tableHeader, tableBody} from "../../../../style/table-styles"

const EventoForm = (props) => {
    const {handleSubmit, talleres, onEventoAgregar} = props;
    return (
        <form name="EventoForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h2>Información del evento</h2>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="titulo">
                            Nombre del evento<span className="required-field">*</span>
                        </label>
                        <Field name="titulo" component={renderField} type="text"/>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-6 pl-0">
                            <label htmlFor="limite_participantes_evento" className="m-0 pr-2">
                                Limite participantes<span className="required-field">*</span>
                            </label>
                            <Field name="limite_participantes_evento" component={renderNumber} type="number"/>
                        </div>
                        <div className="col-md-6 pr-0">
                            <label htmlFor="limite_participantes_talleres" className="m-0 pr-2">
                                Limite talleres<span className="required-field">*</span>
                            </label>
                            <Field name="limite_participantes_talleres" component={renderNumber} type="number"/>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="categoria">
                            Categoria
                        </label>
                        <Field
                            name="categoria"
                            isClearable={true}
                            component={AsyncSelectField}
                            loadOptions={getCategorias}
                            placeholder="Seleccione categoria..."
                            getOptionLabel={(option) => (option["nombre"])}
                            getOptionValue={(option) => (option["id"])}
                        />
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-6 pl-0">
                            <label htmlFor="fecha">
                                Fecha<span className="required-field">*</span>
                            </label>
                            <Field name="fecha" component={renderField} type="text"/>
                        </div>
                        <div className="col-md-6 pr-0">
                            <label htmlFor="hora">
                                Hora<span className="required-field">*</span>
                            </label>
                            <Field name="hora" component={renderField} type="text"/>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="lugar">
                            Dirección<span className="required-field">*</span>
                        </label>
                        <Field name="lugar" component={renderField} type="text"/>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="descripcion">
                            Descripción
                            <span className="required-field">*</span>
                            <small className="make-regular"> (500 caracteres max.)</small></label>
                        <Field name="descripcion" component={renderTextArea} type="text"/>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="imagen_evento">Cargar Imagen</label>
                        <Field
                            name="imagen_evento"
                            component={renderFilePicker}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h2>Administración de talleres</h2>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="nombre">
                            Nombre del taller<span className="required-field">*</span>
                        </label>
                        <Field name="nombre" component={renderField} type="text"/>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label htmlFor="capacitador">
                            Capacitador<span className="required-field">*</span>
                        </label>
                        <Field name="capacitador" component={renderField} type="text"/>
                    </div>
                    <div className="col-md-12 mt-3">
                        <button onChange={onEventoAgregar} type="button" className="btn btn-info w-100 make-bold">
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

export default reduxForm({
    form: 'EventoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            titulo: validators.exists()('Este campo es requerido'),
            limite_participantes_evento: validators.exists()('Este campo es requerido'),
            limite_participantes_talleres: validators.exists()('Este campo es requerido'),
            fecha: validators.exists()('Este campo es requerido'),
            hora: validators.exists()('Este campo es requerido'),
            lugar: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
        });
    },
})(EventoForm);