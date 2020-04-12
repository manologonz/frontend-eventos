import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {validate} from "validate-redux-form";
import renderDatePicker from "../../../utils/DatePicker/DatePicker";
import {AsyncSelectField} from "../../../utils/renderField/renderField";
import {getCategorias} from "../../../../utility/variables";
import AllEventosList from "../Listar/AllEventosList";

class AdminEvents extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            admin: null,
            usingFilters: false,
            categoria: "",
            date_range: {
                fecha_after: "",
                fecha_before: ""
            },
        }
    }

    componentDidMount() {
        const {listar, listUserEvents, page, user} = this.props
        if(!!user){
            this.setState({admin: user.id})
            listUserEvents(1, user.id)
        }
        listar(page)
    }

    handleCategoriaChange = (categoria) => {
        const { listUserEvents } = this.props
        const {date_range, admin} = this.state;
        if(date_range.fecha_after === "" || date_range.fecha_before === ""){
            listUserEvents(1, admin, null, categoria.id)
        } else {
            listUserEvents(1, admin, date_range, categoria.id)
        }
        this.setState({categoria:categoria.id, usingFilters: true})
    }

    handleFechaFinChange = (fecha) => {
        const {listUserEvents} = this.props;
        const {categoria, admin} = this.state;
        const date_range = _.cloneDeep(this.state.date_range)
        date_range.fecha_before = fecha.format("YYYY-MM-DD")
        if(date_range.fecha_after !== "")     {
            listUserEvents(1, admin, date_range, categoria)
        }
        this.setState({date_range, usingFilters: true})
    }

    handleFechaInicioChange = (fecha) => {
        const {listUserEvents} = this.props
        const {categoria, admin} = this.state
        const date_range = _.cloneDeep(this.state.date_range)
        date_range.fecha_after = fecha.format("YYYY-MM-DD")
        if(date_range.fecha_before !== "") {
            listUserEvents(1, admin, date_range, categoria)
        }
        this.setState({date_range, usingFilters: true})
    }

    onPageChange = (page) => {
        const { admin } = this.state
        const { listUserEvents } = this.props
        const { categoria, date_range } = this.state
        listUserEvents(page, admin, date_range, categoria, true)
    }

    clearFilters = () => {
        const {listar, clearFilters} = this.props
        this.setState({
            categoria: "",
            usingFilters: false,
            date_range: {
                fecha_before: "",
                fecha_after: "",
            }
        })
        listar(1)
        clearFilters()
    }

    render() {
        const {data, page, count} = this.props
        const { usingFilters } = this.state
        return (
            <div className="main-section p-3">
                <div className="col-md-12 eventos-list-container">
                    <div className="section-container">
                        <div className="remarcable-title mb-1 d-flex justify-content-between">
                            <p>Filtros</p>
                            {
                                (usingFilters ? <p
                                    className="clear-filters mr-4"
                                    onClick={this.clearFilters}
                                >
                                    Eliminar filtros
                                </p> : null)
                            }

                        </div>
                        <div className="d-flex mt-2">
                            <div className="col-md-2 pl-0">
                                <label htmlFor="fecha-inicio">Categorias</label>
                                <Field
                                    onValueChange={this.handleCategoriaChange}
                                    name="categoria"
                                    component={AsyncSelectField}
                                    loadOptions={getCategorias}
                                    placeholder="Seleccione Categoria"
                                    getOptionLabel={(option) => (option["nombre"])}
                                    getOptionValue={(option) => (option["id"])}
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="fecha-inicio">Fecha inicio</label>
                                <Field
                                    onValueChange={this.handleFechaInicioChange}
                                    name="fecha_inicio"
                                    component={renderDatePicker}
                                    placeholder="Seleccione fecha..."
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="fecha-fin">Fecha fin</label>
                                <Field
                                    onValueChange={this.handleFechaFinChange}
                                    name="fecha_fin"
                                    component={renderDatePicker}
                                    placeholder="Seleccione fecha..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="section-container">
                        <div className="remarcable-title d-flex justify-content-between">
                            <p>Mis eventos</p>
                            <p className="mr-4">resultados: {(data.results.length > 0) ? data.count : 0}</p>
                        </div>
                        <AllEventosList isAdmin={true} count={count} eventos={data} page={page} onPageChange={this.onPageChange}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default reduxForm({
    form: 'EventoListar', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {

        });
    },
})(AdminEvents);