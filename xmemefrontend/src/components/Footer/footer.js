import React from 'react';
import './footer.css'

function Footer(props) {
    return(
        <div className="container footer">

            <div className="row justify-content-center">             
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <div><strong>Yogesh Kansal<br></br></strong>
                            <a href="https://www.linkedin.com/in/yogesh-kansal-044a75194/"><span class="fa fa-linkedin fa-lg"></span></a>&nbsp;
                            <a href="https://github.com/yogesh-kansal"><span class="fa fa-github fa-lg"></span></a>&nbsp;
                            <a href="https://facebook.com/"><span class="fa fa-facebook fa-lg"></span></a>
                        </div>
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