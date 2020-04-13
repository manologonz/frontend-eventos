import React, {Component} from 'react';
import LoadMask from "../../../utils/LoadMask/LoadMask";
import InscritoEventosList from "./InscritoEventosList";

class EventosInscrito extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            usingFilters: false,
            categoria: "",
            date_range: {
                fecha_after: "",
                fecha_before: ""
            },
        }
    }

    componentDidMount() {
        const {listarEventosInscrito, page} = this.props
        listarEventosInscrito(page)
    }

    render() {
        const {inscrito_list, page, count, loader} = this.props
        return (
            <div className="main-section p-3">
                <div className="col-md-12 eventos-list-container">
                    <div className="section-container">
                        <div className="remarcable-title d-flex justify-content-between">
                            <p>Eventos agregados</p>
                        </div>
                        <LoadMask loading={loader} type={"ThreeDots"} blur>
                            <InscritoEventosList eventos={inscrito_list} page={page} onPageChange={this.onPageChange}/>
                        </LoadMask>
                    </div>
                </div>

            </div>
        );
    }
}

export default EventosInscrito