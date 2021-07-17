import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import sort from 'fast-sort';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import Render_meme from '../Rendermemes/render_meme';
import URL from '../../config';

class Profile extends Component {
    state= { 
        memes:null,
        isLoading:false,
        err:false
    }

    componentDidMount() {
        axios.get(URL.backend+`memes?id=${this.props.user._id}`)
        .then(res => {
          var data = res.data.data;
            console.log(data)
          //to sort data is descending order
          sort(data).desc(u => u.updatedAt);
  
          this.setState({
              isLoading: false,
              memes: data.slice(0,100),
          })
        })
        .catch(err => {
    
          this.setState({
              isLoading: false,
              err: err.response?err.response.data:err.message,
          })
        })
    }

    updateMeme=(prev,meme)=> {
        let memes=this.state.memes;
        let index=memes.indexOf(prev);
        memes[index]=meme;
        this.setState({
            memes:memes
        })
    }
    
    deleteMeme=(prev)=> {
        let memes=this.state.memes;
        let index=memes.indexOf(prev);
        console.log(index)
        memes.splice(index,1);
        this.setState({
            memes:memes
        })
    }


    render() {
        const user=this.props.user;
      //  console.log(this.props)
        return (
            <div class="container">
                <div class="main-body">

                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h4>Memer</h4>
                                            <p class="text-secondary mb-1">Full Stack Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-header border-0 bg-info text-white mt-1 ml-1 mr-1 border-1">
                                    <div className="row align-items-center">
                                        <h5 className="col-auto ml-2">Profile Info.</h5>
                                        
                                        <div className="col-auto ml-auto mr-3">
                                            <Link to={`/user/edit`}>
                                                <button className="btn btn-outline-light"><span className="fa fa-pencil fa-lg"></span> </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row mt-3">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">User Name</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.username}</div>
                                    </div>
                                <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">Email</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.emailId}</div>
                                    </div>
                                <hr />
                                    <div className="row mb-2">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">Institute</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.institute}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row gutters-sm mt-5">
                        <div className="container-fluid">
                            <div className="row mb-5">
                                <div className="col-auto label">
                                    <h3>MY MEMES</h3>
                                    <hr></hr>
                                </div>
                            </div>

                            {
                            this.state.isLoading
                            ?
                                <LoadingSpinner />    
                            :
                            this.state.err
                            ?
                            <div className="row label justify-content-center mt-5">
                                <h3>Something Went wrong....</h3>
                            </div>
                            :
                            this.state.memes && this.state.memes.length
                                ?
                                    <div className="row mt-5">
                                        {this.state.memes.map((meme) => {
                                            return(
                                                <div key={meme._id} className="col-8 col-sm-6 col-md-4 mb-5">
                                                    <Render_meme meme={meme}  user={this.props.user} updateMeme={this.updateMeme} deleteMeme={this.deleteMeme}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                :
                                    <div className="row label justify-content-center mt-5">
                                        <h3>Don't have any memes right now!!!</h3>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;