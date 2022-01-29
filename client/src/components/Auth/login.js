import  { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import './style.css'
import axios from 'axios';
import URL from '../../config';

class Login extends Component {
    state= {
        email: '',
        password: ''
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    handleSubmit=(e) => {
        e.preventDefault();
        axios.post(URL.backend+'user/login',this.state)
        .then(res=> {
            console.log(res);
            this.props.logIn(res.data.accesstoken,res.data.user);
            this.props.history.push('/home');
        })
        .catch(err=> {
            if(err.response)
                alert(err.response.data)
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
                                        <h3>Log In</h3>
                                        <hr></hr>
                                    </div>
                                </div>

                                <div className="row mb-3 justify-content-center px-3">
                                    <label htmlFor="email" className="form-label label col-12">Email Id</label>
                                    <Input type="email" id="email" className="col-12" 
                                        placeholder="Enter User Email Id..."
                                        value={this.state.email}
                                        onChange={this.handleChange}>
                                    </Input>
                                </div>
                                <div className="row mb-3 justify-content-center px-3">
                                    <label htmlFor="password" className="form-label label col-12">Password</label>
                                    <Input type="password" id="password"  className="col-12" 
                                        placeholder="Enter Your Password..."
                                        value={this.state.password}
                                        onChange={this.handleChange}>
                                    </Input>
                                </div>

                                <div className="row my-3 mx-3 justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-block sub">Login</button>
                                </div>

                                <div class="row justify-content-center">
                                    <p class="text-center">Don't have account? <a className=" link-info fs-5" id="link" href="/signup">Sign up
                                        here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );        
    }
}

export default Login;
