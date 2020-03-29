import React, {Component} from 'react';
import Logo from "../../../../assets/img/sac-logo.png";
import {Dropdown, DropdownItem} from "react-bootstrap";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import {Link, NavLink} from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    isEmpty = (obj) => {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };

    render() {
        const { user } = this.props;
        return (
            <nav className="navigation">
                <div className="logo-container col-md-1">
                    <img className="navbar-logo" alt="Logo" src={Logo}/>
                </div>
                <nav className="nav-options-container col-md-9 p-0">
                </nav>
                <div className="user-container col-md-2">
                    {
                        (!this.isEmpty(user)) ? (
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle color="white" caret className="nav-item-dropdown border-0">
                                    <span className="d-none d-md-inline-block">{user.username}</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem>
                                        <Link tabIndex="0"
                                              to="/user-profile">
                                            <i className="material-icons"></i>
                                            Profile
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link tabIndex="0"
                                              to="/edit-user-profile">
                                            <i className="material-icons"></i>
                                            Edit Profile
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link tabIndex="0"
                                              to="/file-manager-list">
                                            <i className="material-icons"></i>
                                            Files
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link tabIndex="0"
                                              to="/transaction-history">
                                            <i className="material-icons"></i>
                                            Transactions
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        <a tabIndex="0" className="text-danger" href="/">
                                            <i className="material-icons text-danger"></i>
                                            Logout
                                        </a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <NavLink to="/login">
                                LOGIN
                            </NavLink>
                        )
                    }

                </div>
            </nav>
        );
    }
}

export default NavBar