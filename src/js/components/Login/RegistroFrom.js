import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { renderField } from '../../utils/renderField';

const RegistroForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="username">Usuario</label>
                <Field name="username" label="Usuario" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="first_name">Nombre</label>
                <Field name="first_name" label="Nombre" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="last_name">Apellido</label>
                <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="email">Correo electronico</label>
                <Field name="email" label="Correo electronico"
                       component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña</label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Confirmar contraseña</label>
                <Field
                    name="confirm_password"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Crear Cuenta</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'registro', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
            confirm_password: validators.exists()('Este campo es requerido'),
        });
    },
})(RegistroForm);
