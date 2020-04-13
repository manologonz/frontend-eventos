import React, {Component} from 'react';
import moment from "moment";
import {tableBody, tableHeader} from "../../../../style/table-styles";
import {TableHeaderColumn} from "react-bootstrap-table";
import Grid from "../../../utils/Grid";
import LoadMask from "../../../utils/LoadMask/LoadMask";
import eventos from "../../../../redux/modules/eventos/eventos";

class EventoDetalle extends Component {

    componentDidMount() {
        const {leer,getUserEventos, getUserTalleres, match} = this.props
        getUserEventos()
        getUserTalleres()
        leer(match.params.id)
    }

    isEventoAgregado = () => {
        const {user_eventos} = this.props
        const eventoId = parseInt(this.props.match.params.id);
        let encontrado = false
        if(!!user_eventos) {
            user_eventos.forEach((registro) => {
                if(registro.reg_evento === eventoId){
                    encontrado = true
                }
            })
        }
        return encontrado
    }
    isTallerAgregado = (id) => {
        const {user_talleres} = this.props
        let encontrado = false
        if(!!user_talleres) {
            user_talleres.forEach((registro) => {
                if(registro.reg_taller === id){
                    encontrado = true
                }
            })
        }
        return encontrado
    }

    handleInscripcionEvento = () => {
        const { inscribirseEvento, match, getUserEventos, getUserTalleres } = this.props
        inscribirseEvento(match.params.id)
    }
    handleBajaEvento = () => {
        const { bajaEvento, match, getUserEventos, getUserTalleres } = this.props
        bajaEvento(match.params.id)
    }

    handleInscripcionTaller  = (id) => {
        const { inscribirseTaller, match } = this.props;
        return () => {
            inscribirseTaller(match.params.id, id)
        }
    }
    handleBajaTaller  = (id) => {
        const { bajaTaller, match } = this.props;
        return () => {
            bajaTaller(match.params.id, id)
        }
    }

    render() {
        const {item, loader, user_eventos, user_talleres} = this.props;
        return (
            <div className="main-section p-3">
                <LoadMask loading={loader} type={"ThreeDots"} blur>
                    <div className="col-md-12 detail-container">
                        <div className="d-flex justify-content-between">
                            <h2>{item.titulo}</h2>
                            {
                                (!!user_eventos && this.isEventoAgregado()) ? (
                                    <button
                                        onClick={this.handleBajaEvento}
                                        className="btn btn-danger"
                                    >
                                        Darse de baja
                                    </button>
                                ) : (
                                    <button onClick={this.handleInscripcionEvento}
                                            className="btn btn-info"
                                    >
                                        Inscribirse
                                    </button>
                                )
                            }
                        </div>
                        <hr/>
                        <div className="content pl-2">
                            <p>Lugar: {item.lugar}</p>
                            <p>Fecha: {moment(item.fecha, "YYYY-MM-DD").format("DD/MM/YYYY")}</p>
                            <p>Hora: {moment(item.fecha + ' ' + item.hora).format("HH:mm")}</p>
                            <p>Cupos disponibles: {item.cupos_restantes}</p>
                            <p>Categoria: {!!item.categoria ? item.categoria.nombre : "Sin categoria"}</p>
                            <p className="mb-1">Descripcion: </p>
                            <div>
                                <p>{item.descripcion}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h3>Talleres</h3>
                        </div>
                        <hr/>
                        <Grid
                            data={{results: item.talleres}}
                            pagination={false}
                            tableHeaderClass="table-header"
                            bodyContainerClass="table-body"
                            headerStyle={tableHeader}
                            bodyStyle={tableBody}
                        >
                            <TableHeaderColumn
                                width='20%'
                                dataField="det_taller"
                                dataFormat={(cell) => (
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                        {
                                            (!!user_eventos && this.isTallerAgregado(cell.id)) ? (
                                                <button
                                                    onClick={this.handleBajaTaller(cell.id)}
                                                    className="btn btn-danger"
                                                >
                                                    Darse de baja
                                                </button>
                                            ) : (
                                                <button onClick={this.handleInscripcionTaller(cell.id)}
                                                        className="btn btn-info"
                                                >
                                                    Inscribirse
                                                </button>
                                            )
                                        }
                                    </div>
                                )}
                            >
                                ACCIONES
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="det_taller"
                                isKey
                                dataFormat={(cell) => cell.nombre}
                            >
                                TALLER
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="det_taller"
                                dataFormat={(cell) => cell.capacitador}
                            >
                                CAPACITADOR
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                </LoadMask>
            </div>
        );
    }
}

export default EventoDetalle;