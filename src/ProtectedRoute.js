import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "./redux/modules/cuenta/login";

import NavBar from "./js/components/layout/NavBar/NavBar";
import VerifyLogin from "./js/components/layout/VerifyLogin/VerifyLogin";

class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({toggleOpen: !this.state.toggleOpen });
    };

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

    render() {
        const { component: Component, logOut, login: { me }, ...rest } = this.props;
        const isAuthenticated = this.isAuthenticated();
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        (isAuthenticated === true) ? (<div>
                            <main className="">
                                <NavBar navToggle={this.navToggle} logOut={logOut} user={me} />
                                <div className="main-content-container pr-0 pl-0 container-fluid">
                                    <Component {...props} user={me}/>
                                </div>
                            </main>
                        </div>) : (
                            <VerifyLogin />
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mstp = state => ({ ...state });

const matp = { logOut, getMe };

const ProtectedRoute = connect(
    mstp,
    matp
)(PrivateRouteBase);

export default ProtectedRoute;