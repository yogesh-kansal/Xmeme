import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Render_meme from './render_meme';
import './memes.css'
import URL from '../../config';
import sort from 'fast-sort';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Memes extends Component {
    constructor(props) {
        super(props);
    
        this.state={
          isLoading: true,
          err: null,
          memes: null
        }
      }

    componentDidMount() {

      axios.get(URL.backend+"memes")
      .then(res => {
        var data = res.data.data;

        //to sort data is descending order
        sort(data).desc(u => u.updatedAt);

        this.setState({
            isLoading: false,
            memes: data.slice(0,100),
        })

        console.log(this.state)
      })
      .catch(err => {
  
        this.setState({
            isLoading: false,
            err: err.response?err.response.data:err.message,
        })
      })
    }
    
    render() {
        return(
            <div className="container">
                <div className="row mb-5">
                    <div className="col-auto label">
                        <h3>MEME STREAM</h3>
                        <hr></hr>
                    </div>
                    <div className="col-auto ml-auto mr-5">
                        <Link to={'/memes/new'}>
                            <button className="btn btn-outline-primary">POST NEW MEME</button>
                        </Link>
                    </div>
                </div>

                {
                this.state.isLoading
                ?
                    <div className="row">
                        <LoadingSpinner />
                    </div>
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
                                        <Render_meme meme={meme}/>
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
        );
    }
}

export default Memes;