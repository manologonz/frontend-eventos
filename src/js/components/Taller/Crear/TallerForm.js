import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../utils/renderField";
import React from "react";
import {validate, validators} from "validate-redux-form";

const TallerForm = (props) => {
    return (
        <React.Fragment>
            <div className="col-md-12 mt-3">
                <label htmlFor="capacitador">
                    Capacitador<span className="required-field">*</span>
                </label>
                <Field name="capacitador" component={renderField} type="text"/>
            </div>
            <div className="col-md-12 mt-3">
                <button className="btn btn-info w-100 make-bold">
                    AGREGAR TALLER
                </button>
            </div>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'EventoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            capacitador: validators.exists()('Este campo es requerido'),
        });
    },
})(TallerForm);