import React, {Component} from 'react';
import PropTypes from "prop-types"
import LoadMask from "../../../utils/LoadMask/LoadMask";
import {Field, reduxForm} from "redux-form";
import {renderField, renderNumber} from "../../../utils/renderField";
import {validate, validators} from "validate-redux-form";
import {getCategorias} from "../../../../utility/variables";
import {AsyncSelectField} from "../../../utils/renderField/renderField";
import addIcon from "../../../../assets/img/action-icons/add-icon.png"
import EventoForm from "./EventoForm";

class EventoCrear extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            talleres: {
                results: []
            }
        }
    }

    static propTypes = {
        crear: PropTypes.func.isRequired,
    };

    handleSubmit =(data) => {
        console.log(data);
    };

    render() {
        const { loader } = this.props;
        const { talleres } = this.state;
        return (
            <div className="p-3">
                <LoadMask loading={loader}>
                    <EventoForm talleres={talleres} onSubmit={this.handleSubmit} />
                </LoadMask>
            </div>
        );
    }
}

export default EventoCrear;