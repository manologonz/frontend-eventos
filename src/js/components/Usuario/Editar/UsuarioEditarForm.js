import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber} from "../../../utils/renderField";

const UsuarioEditarForm = (props) => {
    const {me, handleSubmit} = props
    return (
        <form action="" onSubmit={handleSubmit}>
            <h2>PERFIL</h2>
            <hr/>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                    <h6 className="m-0">{me.first_name} {me.last_name}</h6>
                    <small>{me.profile.user_rol.nombre}</small>
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column flex-1 mx-3">
                        <div className="form-group has-feedback">
                            <label htmlFor="username">Username</label>
                            <Field
                                disabled={(me.profile.user_rol.nombre === "Administrador")}
                                name="username"
                                placeholder="Username"
                                component={renderField}
                                type="text"
                                className="form-control"/>
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="first_name">Nombre</label>
                            <Field name="first_name" placeholder="Nombre" component={renderField} type="text"
                                   className="form-control"/>
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="last_name">Apellido</label>
                            <Field name="last_name" placeholder="Nombre" component={renderField} type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="emal">Email</label>
                            <Field name="email" placeholder="Email" component={renderField} type="text"
                                   className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <button className="btn btn-primary w-100">Guardar</button>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'UsuarioEditarForm', // a unique identifier for this form
})(UsuarioEditarForm);
