import React, {Component} from 'react';
import PropTypes from "prop-types"
import LoadMask from "../../../utils/LoadMask/LoadMask";
import EventoForm from "./EventoForm";
import CategoriaFormModal from "../extra-components/CategoriaFormModal/CategoriaFormModal";
import {NotificationManager} from "react-notifications";
import _ from "lodash"

class EventoCrear extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imagen: null,
            open: false,
            count: 0,
            talleres: {
                results: []
            }
        }
    }

    static propTypes = {
        crear: PropTypes.func.isRequired,
    };

    handleEventoSubmit = (data) => {
        const {crear} = this.props;
        if(this.state.talleres.results <= 0){
            NotificationManager.error('Debe crear al menos un taller', 'ERROR');
        } else {
            const body = {
                evento: {
                    ...data,
                    categoria: (data.categoria) ? (data.categoria.id) : null,
                    imagen_evento: null
                },
                talleres: this.state.talleres.results
            }
            crear(body, [{"name": "imagen_evento", "value": this.state.imagen}])
        }
    };

    handleCategoriaSubmit = (data) => {
        const {categoriaCrear} = this.props
        categoriaCrear(data)
        this.closeModal()
    }

    closeModal = () => {
        this.setState({open: false})
    }

    openModal = () => {
        this.setState({open: true})
    }

    handleTallerAgregar = () => {
        const { changeFormValue } = this.props
        const form = this.props.form.EventoForm
        const talleres = _.cloneDeep(this.state.talleres)
        if(!!form && !!form.values){
            if(!form.values.nombre){
                NotificationManager.error('Debe darle un nombre al taller', 'ERROR');
            } else if(!form.values.capacitador){
                NotificationManager.error('Debe ingresar un capacitador', 'ERROR');
            } else {
                talleres.results.push({
                    id: this.state.count,
                    nombre: form.values.nombre,
                    capacitador: form.values.capacitador
                })
                const count = this.state.count + 1 ;
                this.setState({talleres, count})
            }
            changeFormValue("nombre", "")
            changeFormValue("capacitador", "")
        } else {
            NotificationManager.error(`Debe ingresar un taller y un capacitador`, 'ERROR');
        }
    }

    handleTallerDelete = (id) => {
        const talleres = _.cloneDeep(this.state.talleres)
        let index = -1
        for(let i = 0; i < talleres.results.length; i ++){
            if(talleres.results[i].id === id){
                talleres.results.splice(i, 1)
                break
            }
        }
        this.setState({talleres})
    }

    setFile = (imagen) => {
        this.setState({imagen})
    };

    render() {
        const { loader, imagen_evento } = this.props;
        const { talleres, open } = this.state;
        return (
            <div className="main-section">
                <LoadMask loading={loader} type={"ThreeDots"} blur>
                    <EventoForm
                        talleres={talleres}
                        onAddCategoriaClick={this.openModal}
                        onTallerAgregar={this.handleTallerAgregar}
                        eliminarTaller={this.handleTallerDelete}
                        setFile={this.setFile}
                        imagen_evento={imagen_evento}
                        onSubmit={this.handleEventoSubmit}
                    />
                </LoadMask>
                <CategoriaFormModal
                    isOpen={open}
                    loader={loader}
                    onSubmit={this.handleCategoriaSubmit}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default EventoCrear;