import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';
import LoadMask from "../../utils/LoadMask/LoadMask";
import Tabs from "../../utils/Tabs/Tabs";
import RegistroForm from "./RegistroFrom";
import LoginLogo from "../../../assets/img/login-logo.png"

class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        registrar: PropTypes.func.isRequired,
    };

    hanldeRegistrar = (data) => {
        const {loadFormData, registrar} = this.props
        registrar(data)
        loadFormData({})
    }


    render() {
        const { login, loginState, registrarState } = this.props;
        const { loader: loginLoader } = loginState;
        const { loader: registrarLoader } = registrarState;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="login-background">
                <div className="login-wrapper">
                    <div className="login-container col-md-8 p-0">
                        <div className="informacion-container">
                            <img alt="login logo" src={LoginLogo}/>
                        </div>
                        <div className="form-container">
                            <Tabs>
                                <div label="LOGIN">
                                    <div className="col-md-9 login-cont">
                                        <LoadMask loading={loginLoader} type={"ThreeDots"} blur>
                                            <LoginForm onSubmit={login}/>
                                        </LoadMask>
                                    </div>
                                </div>
                                <div label="REGISTRO">
                                    <div className="col-md-9 registro-cont">
                                        <LoadMask loading={registrarLoader} type={"ThreeDots"} blur>
                                            <RegistroForm onSubmit={this.hanldeRegistrar}/>
                                        </LoadMask>
                                    </div>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
