import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Render_meme from './render_meme';
import './memes.css'
import URL from '../../config';

class Memes extends Component {
    constructor(props) {
        super(props);
    
        this.state={
          memeCount: 0,
          isLoading: true,
          err: null,
          memes: null
          }
      }

    componentDidMount() {

      fetch(URL.backend+"memes")
      .then(res => {
        if(res.ok)
          return res;
      })
      .then(res => res.json())
      .then(res => {
        console.log("res is",res);
        var data = res.data;

        this.setState({
            memeCount:data.length,
            isLoading: false,
            memes: data.slice(0,100),
        })

        console.log(this.state)
      })
      .catch(err => {
  
        this.setState({
            isLoading: false,
            err: err.message,
        })
      })
    }
  
    
    render() {

        if(this.state.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <h3>memes</h3>
                            <hr></hr>
                        </div>
                    </div>

                    <div className="row">
                        <LoadingSpinner />
                    </div>
                </div>
            )
        }
        else if(this.state.err) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <h3>memes</h3>
                            <hr></hr>
                        </div>
                    </div>

                    <div className="row justify-content-center err">
                        {this.state.err}
                    </div>
                </div>
            )
        }
        else if(this.state.memes) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <h3>memes</h3>
                            <hr></hr>
                        </div>
                    </div>
                    {this.props.Count(this.state.memes.length)}

                    <div className="row justify-content-center">
                        {this.state.memes.map((meme) => {
                            return(
                                <div key={meme._id} className="col-8 col-sm-3 mb-5">
                                    <Render_meme meme={meme} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        }
    }
}

export default Memes;