import React, {Component} from 'react';
import UsuarioEditarForm from "./UsuarioEditarForm";

class UsuarioEditar extends Component {

    componentDidMount() {
        const { leer, user } = this.props
        leer(user)
    }

    handleSubmit = (data) => {
        const {editar} = this.props
        editar(data)
    }
    render() {
        const {user} = this.props
        return (
            <div className="main-section p-3">
                <div className="profile-container mt-3">
                    <UsuarioEditarForm onSubmit={this.handleSubmit} me={user}/>
                </div>
            </div>

    );
    }
}

export default UsuarioEditar;