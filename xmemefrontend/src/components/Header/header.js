import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return ( 
            <div>
                <nav class="navbar navbar-dark navbar-expand-sm  fixed-top">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand " href="index.html"><img src="img/logo.png" height="30" width="41"></img></a>

                        <div className="collapse navbar-collapse" id="Navbar">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item"><a class="nav-link" href="index.html"><span class="fa fa-home fa-lg"></span> Home</a></li>
                                <li className="nav-item active"><a class="nav-link" href="#"><span class="fa fa-info fa-lg"></span> About</a></li>
                                <li className="nav-item"><a class="nav-link" href="#"><span class="fa fa-list fa-lg"></span> Menu</a></li>
                                <li className="nav-item"><a class="nav-link" href="contactus.html"><span class="fa fa-address-card fa-lg"></span> Contact</a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        );
        
    }
}

export default Header;