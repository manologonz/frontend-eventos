import React, {Component} from 'react';
import moment from "moment";
import {tableBody, tableHeader} from "../../../../style/table-styles";
import {TableHeaderColumn} from "react-bootstrap-table";
import Grid from "../../../utils/Grid";
import LoadMask from "../../../utils/LoadMask/LoadMask";

class EventoDetalle extends Component {

    componentDidMount() {
        const {leer, match} = this.props
        leer(match.params.id)
    }

    render() {
        const {item, loader} = this.props;
        return (
            <div className="main-section p-3">
                <LoadMask loading={loader}>
                    <div className="col-md-12 detail-container">
                        <div className="d-flex justify-content-between">
                            <h2>{item.titulo}</h2>
                            <button className="btn btn-info">Inscribirse</button>
                        </div>
                        <hr/>
                        <div className="content pl-2">
                            <p>Lugar: {item.lugar}</p>
                            <p>Fecha: {moment(item.fecha).format("DD/MM/YYYY")}</p>
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
                                isKey
                                dataField="detalle_taller"
                                dataFormat={(cell) => (
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                        <button className="btn btn-info" onClick={() => {
                                        }}>
                                            inscribirse
                                        </button>
                                    </div>
                                )}
                            >
                                ACCIONES
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="det_taller"
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