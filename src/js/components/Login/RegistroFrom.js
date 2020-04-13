import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators, combine, validatorFromFunction } from 'validate-redux-form';
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
                       component={renderField} type="email" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña</label>
                <Field
                    name="password"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Confirmar contraseña</label>
                <Field
                    name="confirm_password"
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
export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});


export default reduxForm({
    form: 'registro', // a unique identifier for this form

    validate: (data) => {
        let email = null;
        if (data.email) {
            email = validators.regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)('Debe ser un correo válido');
        }
        return validate(data, {
            username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: combine(validators.exists()('Este campo es requerido'), email),
            password: validators.exists()('Este campo es requerido'),
            confirm_password: combine(
                validators.exists()('Este campo es requerido'),
                matchPassword(data.password, data.confirm_password)()('Las contraseñas no coinciden')
            ),
        });
    },
})(RegistroForm);
