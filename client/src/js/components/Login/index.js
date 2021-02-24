import { connect } from 'react-redux';
import { actions as loginActions } from '../../../redux/modules/cuenta/login';
import { actions as registrarActions } from '../../../redux/modules/cuenta/registrar';
import Login from './Login';

const { registrar, loadFormData } = registrarActions;
const { login } = loginActions;

const ms2p = (state) => {
    const { login: loginState, registrar: registrarState } = state;
    return {
        loginState,
        registrarState
    };
};

const md2p = { registrar, login, loadFormData };

export default connect(ms2p, md2p)(Login);