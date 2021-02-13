import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

function Footer(props) {
    return(
        <div className="container footer">

            <div className="row justify-content-center">             
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <p><strong>Yogesh Kansal<br></br></strong>
                            <a href="https://linkedin.com"><span class="fa fa-linkedin fa-lg"></span></a>&nbsp;
                            <a href="https://github.com"><span class="fa fa-github fa-lg"></span></a>&nbsp;
                            <a href="https://facebook.com/"><span class="fa fa-facebook fa-lg"></span></a>
                        </p>
                    </div>

                </div>
            </div>

            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2021</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;