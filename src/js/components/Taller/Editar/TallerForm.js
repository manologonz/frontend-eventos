import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../utils/renderField";
import React from "react";
import {validate, validators} from "validate-redux-form";
import Grid from "../../../utils/Grid";
import {tableBody, tableHeader} from "../../../../style/table-styles";
import {TableHeaderColumn} from "react-bootstrap-table";

const TallerForm = (props) => {
    const { handleSubmit, eliminar, talleres, eliminarTaller} = props
    return (
        <form name="TallerForm" className="form-column ml-2 form-validate mb-lg" onSubmit={handleSubmit}>
            <div>
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
                    <button type="submit" className="btn btn-info w-100 make-bold">
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
                <div className="col-md-12 mt-3">
                    <button
                        onClick={eliminar}
                        type="button"
                        className="btn btn-danger w-100 make-bold"
                    >
                        ELIMINAR EVENTO
                    </button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'TallerForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            capacitador: validators.exists()('Este campo es requerido'),
        });
    },
})(TallerForm);