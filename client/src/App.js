import { Component } from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import URL from './config';

import Signup from './components/Auth/signup';
import Login from './components/Auth/login';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';

import Form from './components/Renderform/form';
import Memes from './components/Rendermemes/memes';

import Profile from './components/User/profile';
import Edit from './components/User/edit';
import SingleMeme from './components/SingleMeme/singleMeme';

class App extends Component {
  state={
    isloggedin:false,
    accesstoken:null,
    user:null
  }

  componentDidMount()
  {
    let accesstoken=localStorage.getItem('accesstoken');
    if(accesstoken) {
      axios.get(URL.backend+'user/refresh',{
        headers: {
          "Authorization":"Bearer "+accesstoken
        }
      })
      .then(res => {
        //console.log(res)
        this.setState({
          isloggedin:true,
          accesstoken,
          user:res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  logIn =(accesstoken,user) => {
    //console.log('login');
    localStorage.setItem('accesstoken',accesstoken);
    this.setState({
      isloggedin:true,
      accesstoken,
      user:user
    })
  }

  logOut=() => {
    //console.log('logout');
    localStorage.clear();
    this.setState({
      isloggedin:false,
      accesstoken:null,
      user:null
    })
  }

  updateUser=(user) => {
    this.setState({
      user:user
    })
  }

  render() {
    return (
      <div className="App">
        <div className="wrap">
        <BrowserRouter>
          <Header isloggedin={this.state.isloggedin} logOut={this.logOut}/>
          {
            !this.state.isloggedin
            ?
            <Switch>
              <Route path="/home" component={Memes}/>
              <Route path="/memes/new" component={Form}/>
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={(props) => <Login {...props} logIn={this.logIn}/>} />
              {/* <Redirect to="/home"/> */}
            </Switch>
            :
            <Switch>
              <Route path="/home" component={() => <Memes user={this.state.user}/>}/>
              <Route path="/memes/new" component={(props) => <Form {...props} user={this.state.user}/>}/>
              <Route path="/memes/:memeId" component={() => <SingleMeme user={this.state.user}/>}/>
              <Route exact path="/user" component={(props) => <Profile {...props} user={this.state.user}/>}/>
              <Route path="/user/edit" component={(props) => <Edit {...props} user={this.state.user} updateUser={this.updateUser}/>} />
              {/* <Redirect to="/home"/> */}
            </Switch>
          }
        </BrowserRouter>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
