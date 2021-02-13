import React, { Component } from 'react';
import {Form, FormGroup, Label, Input,Button, FormFeedback} from 'reactstrap';
import './form.css';
import URL from '../../config';

class RenderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author:'',
            url:'',
            caption:'',
            err:'',
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
        //console.log(e.target);
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    //for submitting the form
    handleSubmit(e) {
        e.preventDefault();
       // alert("current state is "+ JSON.stringify(this.state));

        var data ={
            author: this.state.author,
            url: this.state.url,
            caption: this.state.caption
        }

        fetch(URL.backend+"memes",{
            method: 'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log("res is",res);
            alert("your meme has been posted successfully");
            this.setState({
                success:true,
                err:null,
            })
        })
        .catch(err => {
            console.log("err is",err);
            alert("sorty!!! your meme couldn't be posted due to "+JSON.stringify(err.message));
            this.setState({
                success:false,
                err:err.message,
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
                                        valid={errs.url==''}
                                        invalid={errs.url!==''}
                                        onBlur={this.handleTouch('url')}
                                        onChange={this.handleInputChange}>
                                </Input>
                                <FormFeedback>{errs.url}</FormFeedback>
                            </FormGroup>

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