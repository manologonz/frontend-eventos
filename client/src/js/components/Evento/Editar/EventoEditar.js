import React, {Component} from 'react';
import PropTypes from "prop-types"
import LoadMask from "../../../utils/LoadMask/LoadMask";
import EventoEditarForm from "./EventoEditarForm";
import CategoriaFormModal from "../extra-components/CategoriaFormModal/CategoriaFormModal";
import {NotificationManager} from "react-notifications";
import _ from "lodash"
import TallerForm from "../../Taller/Editar/TallerForm";
import {crearTaller, eliminarTaller} from "../../../../redux/modules/eventos/eventos";

class EventoEditar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imagen: null,
            eliminar: [],
            open: false,
            count: 0,
        }
    }

    componentDidMount() {
        const {leer, match} = this.props
        leer(match.params.id, true)
    }

    static propTypes = {
        editarEvento: PropTypes.func.isRequired,
    };

    handleEventoSubmit = (data) => {
        const {editarEvento, match} = this.props;
        if(this.props.talleres.results <= 0){
            NotificationManager.error('Un evento debe tener al menos un taller', 'ERROR');
        } else {
            const body = {
                ...data,
                categoria: (!!data.categoria) ? data.categoria.id : null,
                imagen_evento: null
            }
            editarEvento(match.params.id, body, [{"name": "imagen_evento", "value": this.state.imagen}])
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

    handleTallerSubmit = (data) => {
        const { crearTaller, match } = this.props
        crearTaller(match.params.id, data)
    }

    handleTallerDelete = (id) => {
        const { eliminarTaller, match } = this.props;
        eliminarTaller(match.params.id, id)
    }

    handleEliminarEvento = () => {
        const { eliminar, match } = this.props
        eliminar(match.params.id)
    }

    setFile = (imagen) => {
        this.setState({imagen})
    };

    render() {
        const { loader, imagen_evento, talleres, eliminar } = this.props;
        const { open } = this.state;
        console.log(talleres);
        return (
            <div className="main-section">
                <LoadMask loading={loader} type={"ThreeDots"} blur>
                    <div className="d-flex p-3">
                        <EventoEditarForm
                            onAddCategoriaClick={this.openModal}
                            setFile={this.setFile}
                            imagen_evento={imagen_evento}
                            onSubmit={this.handleEventoSubmit}
                        />
                        <TallerForm
                            talleres={talleres}
                            eliminar={this.handleEliminarEvento}
                            onTallerAgregar={this.handleTallerAgregar}
                            eliminarTaller={this.handleTallerDelete}
                            onSubmit={this.handleTallerSubmit}
                        />
                    </div>

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