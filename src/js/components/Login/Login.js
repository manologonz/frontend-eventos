import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';
import LoadMask from "../../utils/LoadMask/LoadMask";

class Login extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a SAC</h1>
                    <p>Sistema de Administracion de Capacitaciones</p>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">INGRESAR</h5>
                        <LoadMask loading={loader} light>
                            <LoginForm onSubmit={onSubmit} />
                            <span>¿No tienes cuenta?&nbsp;<Link to="#">Registrate aquí</Link></span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
