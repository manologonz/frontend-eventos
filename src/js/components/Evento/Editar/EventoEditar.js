import React, {Component} from 'react';
import PropTypes from "prop-types"
import LoadMask from "../../../utils/LoadMask/LoadMask";
import EventoEditarForm from "./EventoEditarForm";
import CategoriaFormModal from "../extra-components/CategoriaFormModal/CategoriaFormModal";
import {NotificationManager} from "react-notifications";
import _ from "lodash"

class EventoEditar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imagen: null,
            open: false,
            count: 0,
        }
    }

    componentDidMount() {
        const {leer, match} = this.props
        leer(match.params.id, true)
    }

    static propTypes = {
        editar: PropTypes.func.isRequired,
    };

    handleEventoSubmit = (data) => {
        const {editar, match} = this.props;
        if(this.props.talleres.results <= 0){
            NotificationManager.error('Un evento debe tener al menos un taller', 'ERROR');
        } else {
            const body = {
                evento: {
                    ...data,
                    fecha: data.fecha.format("YYYY-MM-DD"),
                    hora: data.hora.format("HH:mm:ss"),
                    categoria: data.categoria.id,
                    imagen_evento: null
                },
                talleres: this.props.talleres.results
            }
            editar(match.params.id, body, [{"name": "imagen_evento", "value": this.state.imagen}])
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
        const { changeFormValue, setTalleresValue } = this.props
        const talleres = _.cloneDeep(this.props.talleres)
        const form = this.props.form.EventoForm
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
                this.setState({count: talleres.length + 1})
                setTalleresValue(talleres)
            }
            changeFormValue("nombre", "")
            changeFormValue("capacitador", "")
        } else {
            NotificationManager.error(`Debe ingresar un taller y un capacitador`, 'ERROR');
        }
    }

    handleTallerDelete = (id) => {
        const { setTalleresValue } = this.props;
        const talleres = _.cloneDeep(this.props.talleres)
        const index = _.indexOf(talleres.results, (taller) => (taller.id === id))
        talleres.results.splice(index, 1)
        setTalleresValue(talleres)
    }

    setFile = (imagen) => {
        this.setState({imagen})
    };

    render() {
        const { loader, imagen_evento, talleres } = this.props;
        const { open } = this.state;
        return (
            <div className="main-section">
                <LoadMask loading={loader}>
                    <EventoEditarForm
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

export default EventoEditar;