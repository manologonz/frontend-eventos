import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../utils/renderField";
import React from "react";
import {validate, validators} from "validate-redux-form";

const CategoriaForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="categoriaForm" onSubmit={handleSubmit}>
            <div className="col-md-12 mt-3">
                <label htmlFor="nombre">
                    Nombre Categoria<span className="required-field">*</span>
                </label>
                <Field name="nombre" component={renderField} type="text" placeholder="Categoria"/>
            </div>
            <div className="col-md-12 mt-3">
                <button className="btn btn-info w-100 make-bold">
                    AGREGAR CATEGORIA
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'CategoriaForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
        });
    },
})(CategoriaForm);