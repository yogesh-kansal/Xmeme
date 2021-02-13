import React, { Component } from 'react';
import './about.css'

class RenderForm extends Component {

    render() {
        return (
            <div>
                <div className="container about">
                    <div className="row">
                        <div className="col-auto">
                            <h3>About</h3>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8">
                            <p>
                                <code>Xmeme</code> is Web App which basically can be used to keep your 
                                Memes at one place. I have used the mern stack for the development of this web App
                                React for front end, node.js for backend, mondoDB for data storage at backend.
                                For more information you can visit to me. 
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <h3>Contact</h3>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row address">
                        <div className="offset-1 col-6 col-sm-4">
                            Yogesh Kansal<br />
                            <i className="fa fa-phone fa-lg"></i>: 9352284227<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:ykk11@iitbbs.ac.in">
                            ykk11@iitbbs.ac.in</a>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default RenderForm;