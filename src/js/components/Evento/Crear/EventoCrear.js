import React, {Component} from 'react';
import PropTypes from "prop-types"
import LoadMask from "../../../utils/LoadMask/LoadMask";
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber} from "../../../utils/renderField";
import {validate, validators} from "validate-redux-form";
import {getCategorias} from "../../../../utility/variables";
import {AsyncSelectField} from "../../../utils/renderField/renderField";
import addIcon from "../../../../assets/img/action-icons/add-icon.png"

class EventoCrear extends Component {
    static propTypes = {
        crear: PropTypes.func.isRequired,
    };

    handleSubmit =(data) => {
        console.log(data);
    };

    render() {
        const { loader } = this.props;
        return (
            <div className="p-3">
                <LoadMask loading={loader}>
                    <form name="EventoForm" className="form-validate mb-lg" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="evento">Nombre del evento</label>
                                <Field name="titulo" component={renderField} type="text"/>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="col-md-6">
                                    <label htmlFor="evento">Fecha</label>
                                    <Field name="fecha" component={renderField} type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="evento">Hora</label>
                                    <Field name="fecha" component={renderField} type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-md-6 d-flex">
                                <div className="col-md-6 d-flex align-items-center">
                                    <label htmlFor="evento" className="m-0 pr-2">Limite participantes</label>
                                    <Field name="limite_participantes_evento" component={renderNumber} type="number"/>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <label htmlFor="evento" className="m-0 pr-2">Limite talleres</label>
                                    <Field name="limite_participantes_talleres" component={renderNumber} type="number"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-md-5">
                                <label htmlFor="evento">Categoria</label>
                                <Field
                                    name="categoria"
                                    component={AsyncSelectField}
                                    loadOptions={getCategorias}
                                    placeholder="Seleccione categoria..."
                                    getOptionLabel={(option) => (option["nombre"])}
                                    getOptionValue={(option) => (option["id"])}
                                />
                            </div>
                            <div className="col-md-1 d-flex align-items-end">
                                <img className="icon mb-2" alt="icono agregar" src={addIcon}/>
                            </div>
                        </div>
                    </form>
                </LoadMask>
            </div>
        );
    }
}

export default reduxForm({
    form: 'EventoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            evento: validators.exists()('Este campo es requerido'),
        });
    },
})(EventoCrear);