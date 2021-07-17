import React, { Component } from 'react';
import './header.css';
import { Navbar, NavbarBrand, NavbarToggler,
     NavItem, Collapse, Nav, Jumbotron} from 'reactstrap'; 
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }

        this.toggleNav =this.toggleNav.bind(this);
    }

    toggleNav()
    {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })

    }

    render() {
        console.log(this.props);
        return ( 
            <>
                <Navbar dark className="navbar" expand="md" fixed="top" >
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>

                        <NavbarBrand className="mr-auto" href="/">
                            <img src="logo192.png" alt="logo" width="40" height="40"/>
                        </NavbarBrand>

                        <div className="title ml-4">
                            Xmeme
                        </div>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-auto nav">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/about">
                                        <span className="fa fa-info fa-lg"></span> About
                                    </NavLink>
                                </NavItem>

                                <li className="nav-item dropdown ">
                                    <div class="nav-link dropdown-toggle" role="button" data-toggle="dropdown">
                                        <span className="">Auth</span>
                                    </div>

                                    <ul className="dropdown-menu ml-3">
                                    {
                                        !this.props.isloggedin
                                        ?  
                                        <>  
                                            <NavLink className="dropdown-item nav-link" to="/signup"><span className="fa mx-1 fa-sign-in fa-lg"></span> Signup</NavLink>
                                            <NavLink className="dropdown-item nav-link" to="/login"><span className="fa mx-1 fa-sign-in fa-lg"></span> Login</NavLink>
                                        </>
                                        :
                                        <>  
                                            <NavLink className="dropdown-item nav-link" to="/user"><span className="fa mx-1 fa-id-badge fa-lg"></span> Profile</NavLink>
                                            <NavLink className="dropdown-item nav-link" to="/" onClick={this.props.logOut}><span className="fa mx-1 fa-sign-out fa-lg"></span> Sign out</NavLink>
                                        </>
                                    }
                                    </ul>
                                </li>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <div className="space"></div>
            </>
        );
        
    }
}

export default Header;