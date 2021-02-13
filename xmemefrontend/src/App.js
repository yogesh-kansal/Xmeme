import { Component } from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import './App.css';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Form from './components/Renderform/form';
import Memes from './components/Rendermemes/memes';
import About from './components/About/about';

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      memeCount: 0
    }
    this.Count = this.Count.bind(this);
  }

  Count(n)
  {
      this.state.memeCount=n
  }
  
  render() {
    console.log("state app is",this.state);
    return (
      <div>
        <BrowserRouter>
          <Header count ={this.state.memeCount}/>

          <Switch>
            <Route path="/memes" component={() => <Memes Count={(n) =>this.Count(n)}/>}/>
            <Route path="/home" component={() => <Form/>}/>
            <Route path="/about" component={() => <About/>}/>
            <Redirect to="/home"/>
          </Switch>

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
