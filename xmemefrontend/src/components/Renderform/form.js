import React, { Component } from 'react';
import {Form, FormGroup, Label, Input,Button, FormFeedback} from 'reactstrap';
import './form.css';
import URL from '../../config';
import axios from 'axios';
import io from 'socket.io-client';
let socket;

class RenderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author:'',
            url:'',
            caption:'',
            err:'',
            imageFile:null,
            success: false,
            touched: {
                author:false,
                url:false,
                caption:false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
    }

    //for changing state of input field
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInputFileChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
        console.log(e.target,this.state.imageFile)
    }

    //for submitting the form
    handleSubmit(e) {
        e.preventDefault();

        let data=new FormData();
        data.append("author",this.state.author);
        data.append("url",this.state.url);
        data.append("caption",this.state.caption);
        data.append("imageFile",this.state.imageFile);
        if(this.props.user)
            data.append('userId',this.props.user._id);
        else
            data.append('userId','');

        console.log(data)

       axios.post(URL.backend+"memes", data)
        .then(res => {
            
            //for broadcast this post for others.
            socket = io(URL.backend);
            socket.emit('post');
            socket.off();

            console.log("res is",res);
            alert("your meme has been posted successfully");
            this.setState({
                success:true,
                err:null,
            })
            this.props.history.push('/home');
        })
        .catch(err => {
            console.log("err is",err);
            if(err.response)
                alert("sorry!!! your meme couldn't be posted due to "+err.response.data);
            else
                alert("sorry!!! your meme couldn't be posted due to "+err.message);
            this.setState({
                success:false,
                err:err.response.data|| err.message,
            })
        });
        //console.log(this.state);
        this.handleReset();
    }

    //for reseting the form
    handleReset()
    {
        this.setState({
            author:'',
            url:'',
            imageFile:null,
            caption:'',
            touched: {
                author: false,
                url: false,
                caption: false
            }
        })
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    //validating the form
    validate(author, url, caption) {
        const err ={
            author:'',
            url:'',
            caption:''
        }
        if(this.state.touched.author && author.length <3)
            err.author='Username must contain atleast 3 chars';
        else if(this.state.touched.author && author.length >10)
            err.author='Username must contain atmax 10 chars';
        if(this.state.touched.url && !url.length)
            err.url='URL for meme is required';
        if(this.state.touched.caption && caption.length>20)
            err.caption='Cation of atmax 20 char length is prefereable'; 

        return err;
    }

    render() {
        const errs = this.validate(this.state.author, this.state.url, this.state.caption);
        return (
            <div className="form">
            <div className="container">
                <div className="row">
                    <div className="col-auto label">
                        <h3>MEME STREAM</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-9">
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup row>
                                <Label htmlFor="authorname" className="label col-12 col-sm-6">Author</Label>
                                <Input type="text" id="authorname" name="author" className="col-12 col-sm-9" 
                                        placeholder="Author"
                                        value={this.state.author}
                                        valid={errs.author==''}
                                        invalid={errs.author!==''}
                                        onBlur={this.handleTouch('author')}
                                        onChange={this.handleInputChange}>
                                </Input>
                                <FormFeedback>{errs.author}</FormFeedback>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="url" className="label col-12 col-sm-6">URL</Label>
                                <Input type="text" id="url" name="url"  className="col-12 col-sm-9"
                                        placeholder="URL for your meme"
                                        value={this.state.url}
                                        valid={errs.url=true}
                                        onBlur={this.handleTouch('url')}
                                        onChange={this.handleInputChange}>
                                </Input>
                                <FormFeedback>{errs.url}</FormFeedback>
                            </FormGroup>

                            <div className="row mt-4 justify-content-center">
                                <div className="col-4">
                                    OR
                                </div> 
                            </div>

                            <div class="file-input row mb-3 mt-3 justify-content-center">
                                <div className="col-9 col-lg-6">
                                <input type="file" id="imageFile" name="imageFile" className="file"
                                onChange={this.handleInputFileChange}>
                                    </input>
                                <label htmlFor="imageFile" className="">
                                    Select file
                                    <span class="file-name">{this.state.imageFile? this.state.imageFile.name:''}</span>
                                </label>
                                </div>
                                
                            </div>

                            <FormGroup row>
                                <Label htmlFor="caption" className="label col-12 col-sm-6">Caption</Label>
                                <Input type="text" id="caption" name="caption"  className="col-12 col-sm-9"
                                        placeholder="Caption for your meme"
                                        value={this.state.caption}
                                        valid={errs.caption==''}
                                        invalid={errs.caption!==''}
                                        onBlur={this.handleTouch('caption')}
                                        onChange={this.handleInputChange}>
                                </Input>
                                <FormFeedback>{errs.caption}</FormFeedback>
                            </FormGroup>

                            <FormGroup row>
                                <div className="ml-auto mr-auto col-auto">
                                    <Button type="submit" color="primary" outline>
                                        POST meme
                                    </Button>
                                    <Button className="ml-2" type="reset" color="secondary" outline='true' onClick={this.handleReset}>
                                        Reset Form
                                    </Button>
                                </div>
                            </FormGroup>

                        </Form>
                     </div>
                </div>
                
            </div>
            </div>
        );
    }
}

export default RenderForm;