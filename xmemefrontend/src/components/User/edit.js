import React, { Component } from 'react';
import {Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css'
import axios from 'axios';
import URL from '../../config';
import LoadingSpinner from '../LoadingSpinner';

class Edit extends Component {
    state = {
        emailId:'',
        new_name: '',
        new_institute: '',
        old_pass: '',
        new_pass: '',
        touched: {
            user: false,
            ins: false,
            pass:false
        },
        isLoading_info:false,
        isLoading_pass:false
    }

    componentDidMount() {
        let user=this.props.user;
        this.setState({
            emailId:user.emailId,
            new_institute:user.institute,
            new_name:user.username
        })
    }

    validate(user,ins,pass) {
        const err ={
            user: '',
            ins: '',
            pass:''
        }
        if(this.state.touched.user && user.length<3)
            err.user='usernmae must be atleat of lenght 3';
        else if(this.state.touched.pass && user.length>8)
            err.user='username must be atmax of lenght 8';
        if(this.state.touched.ins && ins.length===0)
            err.ins='Addess must be non-empty';
        if(this.state.touched.pass && pass.length<6)
            err.pass='Password must be atleast of lenght 6';
        return err;
    }
    
    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    updateUserInfo=() => {
        this.setState({
            isLoading_info:true
        })
        
        let {user}=this.props;
        let data={};

        if(this.state.new_name!==user.username)
            data.username=this.state.new_name;
        if(this.state.new_institute!==user.institute)
                data.institute=this.state.new_institute;
        console.log(data);

        axios.patch(URL.backend+`user/edit/${user._id}`, data, {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            this.setState({
                isLoading_info:false
            })
            alert(res.data.status);
            this.props.updateUser(res.data.user);
        })
        .catch(err => {
            this.setState({
                isLoading_info:false
            })
            console.log(err.response);
            alert(err.response.data);
        });
    }

    resetPassword=() => {
        this.setState({
            isLoading_pass:true
        })

        let data={
            old:this.state.old_pass,
            new:this.state.new_pass
        }

        axios.patch(URL.backend+`user/reset_password/${this.props.user._id}`, data, {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            this.setState({
                old_pass:'',
                new_pass:'',
                isLoading_pass:false
            })
            alert(res.data);
        })
        .catch(err => {
            this.setState({
                old_pass:'',
                new_pass:'',
                isLoading_pass:false
            })
            console.log(err.response);
            alert(err.response.data);
        });
    }

    render() {
        let errs=this.validate(this.state.new_name,this.state.new_institute,this.state.new_pass);
        return (
            <div class="container">
                <div class="main-body">

                    <div class="row gutters-sm justify-content-center">
                        <div className="col-md-10 pr-4">
                            <div className="row">
                                <div class="col card">
                                    <div className="card-header border-0 my-2 mx-1">
                                        <div className="row align-items-center">
                                            <h5 className="col-auto ml-2 text-danger">Profile Info.</h5>
                                            
                                            <div className="col-auto ml-auto mr-3">
                                                <Link to={`/user`}>
                                                    <button className="btn btn-secondary">Back </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                    this.state.isLoading_info
                                    ?
                                        <LoadingSpinner />
                                    :
                                    
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    
                                                    <input type="text" class="form-control" value={this.state.emailId} readOnly/>
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">User Name</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <Input type="text" id="new_name"
                                                        valid={errs.user===''}
                                                        invalid={errs.user!==''}
                                                        value={this.state.new_name}
                                                        onBlur={this.handleTouch('user')}
                                                        onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                    
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Institute</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <Input type="text" id="new_institute"
                                                        valid={errs.ins===''}
                                                        invalid={errs.ins!==''}
                                                        value={this.state.new_institute}
                                                        onBlur={this.handleTouch('ins')}
                                                        onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-9 text-secondary">
                                                    <button className="btn btn-outline-primary" type="submit"
                                                    onClick={this.updateUserInfo}>Edit Info.</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div class="col card">
                                    <div className="card-header border-0 my-2 mx-1">
                                        <div className="row align-items-center">
                                            <h5 className="col-auto ml-2 text-danger">Password Reset</h5>
                                        </div>
                                    </div>
                                    {
                                    this.state.isLoading_pass
                                    ?
                                        <LoadingSpinner />
                                    :
                                    
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Old password</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <Input type="password" id="old_pass"
                                                        value={this.state.old_pass}
                                                        valid={true}
                                                        onChange={this.handleChange}/>
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">New Password</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <Input type="password" id="new_pass"
                                                        value={this.state.new_pass}
                                                        valid={errs.pass===''}
                                                        invalid={errs.pass!==''}
                                                        onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                    
                                            <div class="row">
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-9 text-secondary">
                                                    <button className="btn btn-outline-primary" type="button"
                                                    onClick={this.resetPassword}>Reset Password</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;