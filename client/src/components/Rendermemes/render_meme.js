import React, { Component } from 'react';
import { Button, 
    Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input,  FormFeedback} from 'reactstrap';
import './memes.css'
import URL from '../../config';
import axios from 'axios';
import io from 'socket.io-client';
import SingleMeme from '../SingleMeme/singleMeme';
import Comments from '../Comments/comments';
let socket;

class Render_meme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isModalOpen2: false,
            imageFile:null,
            url:'',
            caption:'',
            touched: {
                url: false,
                caption: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            user:'',
            usercaption:'',
            imageFile:null
        })
    }

    toggleModal2() {
        console.log("caleed");
        this.setState({
            isModalOpen2: !this.state.isModalOpen2,
            user:'',
            usercaption:'',
            imageFile:null
        })
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleInputFileChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }
    
    //validating the form
    validate(caption) {
        const err ={
            caption:''
        }
        if(this.state.touched.caption && caption.length>20)
            err.caption='feild is optional but if you do then at-max 20 char length is acceptable'; 

        return err;
    }

    handleModify(e) {
        e.preventDefault();
        let data=new FormData();
        console.log(this.state)
        
        if(this.state.url.length)
            data.append("url",this.state.url);
        if(this.state.caption.length)
            data.append("caption",this.state.caption);
        if(this.state.imageFile)
            data.append("imageFile",this.state.imageFile);

        this.toggleModal();
        console.log("data is",data);

        axios.patch(URL.backend+"memes/"+this.props.meme._id, data, {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            console.log(res);
            alert(res.data.message);
            this.props.updateMeme(this.props.meme, res.data.data);
            //for broadcast this post for others.
            socket = io(URL.backend);
            socket.emit('post');
            socket.off();

        })
        .catch(err => {
            if(err.response)
                alert(err.response.data)
            else
                alert("Could not modify meme "+err.message);
        })
    }

    handleDelete() {
        console.log('called')
        axios.delete(URL.backend+"memes/"+this.props.meme._id, {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            alert(res.data.message);
            this.props.deleteMeme(this.props.meme);
            //for broadcast this post for others.
            socket = io(URL.backend);
            socket.emit('post');
            socket.off();
        })
        .catch(err => {
            if(err.response)
                alert(err.response.data)
            else
                alert("Could not modify meme "+err.message);
        })
    }

    render() {
        const errs = this.validate(this.state.caption);
        console.log(this.props)

        return (
            
        <>
            <div className="card" onClick={this.props.user?this.toggleModal2:console.log("")}>
                <div className="card-header " style={{background:"#555", color:"white"}}>
                    <div className="row align-items-center">
                        <h5 className="col-auto ml-2">{this.props.meme.author}</h5>
                                        
                        <div className="col-auto ml-auto" style={{display:!this.props.user?"none":""}}>
                            <button className="btn btn-outline-light mr-2" onClick={() => this.toggleModal()}><span className="fa fa-pencil fa-lg"></span></button>      
                            <button className="btn btn-outline-light" onClick={() => this.handleDelete()}><span className="fa fa-trash fa-lg"></span></button>
                        </div>
                    </div>
                </div>

                <div className="card-body mt-0 p-0" >
                    <div className="row">
                        <div className='col-12'>
                            <img className="meme_img" src={this.props.meme.url} alt="Admin" />
                        </div>
                    </div>
                        
                    <div className="row mt-3">
                        <div className='col-12'>
                            <p className="mb-1 p-1 caption"> {this.props.meme.caption}</p>
                        </div>
                    </div>
                </div>

                <div className="card-footer  text-secondary">
                    <div className="row">
                        <div className="col-12 ml-auto text-right">
                            posted At: {new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'numeric',second:'numeric'}).format(new Date(Date.parse(this.props.meme.createdAt)))} 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ml-auto text-right mt-1">
                            updated: {new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'numeric',second:'numeric'}).format(new Date(Date.parse(this.props.meme.updatedAt)))}
                        </div>
                    </div>
                </div>
            </div>
                                         
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
                            <Label htmlFor="url">URL</Label>
                            <Input type="text" id="url" name="url" 
                                value={this.state.url}
                                valid={true}
                                onChange={this.handleChange} />
                        </FormGroup>

                        <div className="row justify-content-center">
                            <div className="col-auto">
                                OR
                            </div>
                        </div>

                        <FormGroup>
                            <Label htmlFor="imageFile">File</Label>
                            <Input type="file" id="imageFile" name="imageFile" 
                                onChange={this.handleInputFileChange} />
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

            <Modal isOpen={this.state.isModalOpen2} toggle={this.toggleModal2} className="modal-lg">
                {/* <SingleMeme memeId = {this.props.meme._id}/> */}
                <ModalHeader toggle={this.toggleModal2} charCode="x">
                    Comments
                </ModalHeader>
                <ModalBody>
                    <Comments memeId={this.props.meme._id} user={this.props.user}/>
                </ModalBody>
                
            </Modal>
        </>
        );
    }
}

export default Render_meme;
