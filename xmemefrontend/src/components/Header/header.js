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
        return ( 
            <>
                <Navbar dark className="navbar" expand="md">
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
                                    <NavLink className="nav-link" to="/memes">
                                        <span className="fa fa-list fa-lg"></span> Memes
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/about">
                                        <span className="fa fa-info fa-lg"></span> About
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row jumbo ustify-content-center">
                            <div className="col-12 col-sm-6">
                                <h1>Xmeme Web app</h1>
                                <p>Hey, Guys
                                This is Yogesh Kansal prenseting this web app to keep your all memes at one place</p> 
                            </div>
                            <div className="col-12 col-sm">
                                </div>
                            </div>
                    </div>
                </Jumbotron>
            </>
        );
        
    }
}

export default Header;