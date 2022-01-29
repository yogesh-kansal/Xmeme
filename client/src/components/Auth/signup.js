import React, { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import './style.css'
import axios from 'axios';
import URL from '../../config';

class Signup extends Component {
    state= {
        email: '',
        username: '',
        password: ''
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }


    handleSubmit=(e) => {
        e.preventDefault();

        axios.post(URL.backend+'user/signup',this.state)
        .then(res => {
            console.log(res);
            alert(res.data)
            this.props.history.push('/login');
        })
        .catch(err => {
            console.log(err.response);
            if(err.response)
                alert(err.response.data);
            else
                alert(err.message)
        });
    }

    render() {
        return (
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-11 col-lg-4 col-md-7 col-sm-9">
                            <form onSubmit={this.handleSubmit} className="">

                                <div className="row justify-content-center mt-1">
                                    <div className="col-auto heading label">
                                        <h3>Sign Up</h3>
                                            <hr></hr>
                                    </div>
                                </div>
                                
                                <div className="row mb-3 px-3 justify-content-center">
                                    <label htmlFor="username" className="form-label label col-12">Username</label>
                                    <Input type="text" id="username" className="col-12" 
                                        placeholder="Your choice..."
                                        value={this.state.username}
                                        onChange={this.handleChange}>
                                    </Input>                                
                                </div>

                                <div className="row mb-3  px-3 justify-content-center">
                                    <label htmlFor="email" className="form-label label col-12">Email Id</label>
                                    <Input type="email" id="email" className="col-12" 
                                        placeholder="User Email Id..."
                                        value={this.state.email}
                                        onChange={this.handleChange}>
                                    </Input>
                                </div>

                                <div className="row mb-3  px-3 justify-content-center">
                                    <label htmlFor="password" className="form-label label col-12">Password</label>
                                    <Input type="password" id="password"  className="col-12" 
                                        placeholder="Your Password..."
                                        value={this.state.pass}
                                        onChange={this.handleChange}>
                                    </Input>
                                </div>

                                <div className="row my-3 justify-content-center">
                                        <button type="submit" className="col-6 btn btn-primary btn-block sub">Get started here</button>
                                </div>

                                <div class="row mt-3 justify-content-center">
                                    <a className="text-center link-info fs-5" id="link" href="/login">Alreday have an Account?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );     
    }
}

export default Signup;