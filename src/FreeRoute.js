import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logOut, getMe} from "./redux/modules/cuenta/login";
import NavBar from "./js/components/layout/NavBar/NavBar";


class FreeRouteBase extends Component {

    isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const { getMe, login: { me } } = this.props;
        if (!!token && !!me.username) {
            return true;
        } else if(token) {
            getMe();
            return "Verifying"
        }
        return false;
    };
    componentDidMount() {
        const isAuthenticated = this.isAuthenticated();
    }

    render() {
        const {component: Component, logOut, login: {me}, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    <main>
                        <NavBar navToggle={this.navToggle} logOut={logOut} user={me}/>
                        <div className="main-content-container pr-0 pl-0 container-fluid">
                            <Component {...props} />
                        </div>
                    </main>
                }
            />
        );
    }
}

const mstp = state => ({...state});

const matp = {logOut, getMe};

const FreeRoute = connect(
    mstp,
    matp
)(FreeRouteBase);

export default FreeRoute;