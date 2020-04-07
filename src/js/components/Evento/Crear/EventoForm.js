import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber} from "../../../utils/renderField";
import {validate, validators} from "validate-redux-form";

const EventoForm = (props) => {
    const {handleSubmit} = props;
    return (
        <div></div>
    );
};

export default reduxForm({
    form: 'EventoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            evento: validators.exists()('Este campo es requerido'),
        });
    },
})(EventoForm);