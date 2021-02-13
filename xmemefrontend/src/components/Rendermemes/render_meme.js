import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardHeader, Button, 
    Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, CardFooter, FormFeedback} from 'reactstrap';
import './memes.css'
import URL from '../../config';

class Render_meme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            url:'',
            caption:'',
            touched: {
                url: false,
                caption: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
        console.log("current state is ",this.state);
    }

    handleModify(e) {
        e.preventDefault();
        var data={};
        if(this.state.url.length) {
            data.url = this.state.url
        }
        if(this.state.caption.length) {
            data.caption = this.state.caption
        }
        this.toggleModal();
        console.log("data is",data);
        alert("data is"+JSON.stringify(data));

        fetch(URL.backend+"memes/"+this.props.meme._id, {
            method: 'PATCH',
            body:JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            alert(JSON.stringify(res.message));
        })
        .catch(err => {
            alert("Could not delete meme "+err.message);
        })
    }

        //for touchng th box
        handleTouch =(feild) =>(e) => {
            this.setState({
                touched: {...this.state.touched, [feild]:true}
            });
        }
    
        //validating the form
        validate(url, caption) {
            const err ={
                url:'',
                caption:''
            }
            if(this.state.touched.url && !url.length)
                err.url='feild is optional';
            if(this.state.touched.caption && caption.length>20)
                err.caption='feild is optional but if you do then at-max 20 char length is acceptable'; 
    
            return err;
        }

    render() {
        const errs = this.validate(this.state.url, this.state.caption);

        return (
            
        <>
            <Card className="card" style={{width:"100%", height:"100%"}} >
                <CardHeader style={{background:"#555", color:"white"}}
                    > 
                    <div className="row">
                        <div className="mr-auto author">{this.props.meme.author}</div>
                        <div className="ml-auto time">
                            {new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'numeric',second:'numeric'}).format(new Date(Date.parse(this.props.meme.updatedAt)))} 
                        </div>
                    </div>
                </CardHeader>
                <CardBody >
                    <CardImg  className="img" width="100%" height="100%" src={this.props.meme.url} alt="meme"/>
                </CardBody>
                <CardFooter>
                    <div className="conatiner">
                        <div className="row mb-1 caption">
                            <div className="col-auto">
                                {this.props.meme.caption}
                            </div>
                        </div>
                        <div className="row time2">
                            <div className="ml-auto">
                                posted on: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(this.props.meme.updatedAt)))}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="ml-auto">
                            <Button type="" color="secondary" className="mr-1" 
                               onClick={this.toggleModal}>Modify</Button>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
                                         
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal} charCode="x">
                    Modify meme
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.handleModify}>
                    <FormGroup>
                            <Label>Author of The Meme</Label>
                            <Input type="text" value={this.props.meme.author} disabled/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label htmlFor="url">Modified URL</Label>
                            <Input type="text" id="url" name="url" 
                                value={this.state.url}
                                valid={errs.url==''}
                                invalid={errs.url!==''}
                                onBlur={this.handleTouch('url')}
                                onChange={this.handleChange} />
                                <FormFeedback>{errs.url}</FormFeedback>
                        </FormGroup>
        
                        <FormGroup>
                            <Label htmlFor="caption">Modified Caption</Label>
                            <Input type="caption" id="caption" name="caption" 
                                value={this.state.caption}
                                valid={errs.caption==''}
                                invalid={errs.caption!==''}
                                onBlur={this.handleTouch('caption')}
                                onChange={this.handleChange} />
                            <FormFeedback>{errs.caption}</FormFeedback>
                        </FormGroup>
                                                
                        <Button type="submit" value="submit" color="primary">Modify</Button>
                    </Form>
                </ModalBody>

            </Modal>
        </>
        );
    }
}

export default Render_meme;
