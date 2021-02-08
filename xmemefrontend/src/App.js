import logo from './logo.svg';
import './App.css';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import Form from '../components/Renderform/form';
import Memes from '../components/Rendermemes/memes';
import About from '../components/About/about';
import {Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={() => <Form/>}/>
        <Route path="/memes" component={() => <Memes/>}/>
        <Route path="/about" component={() => <About/>}/>
        <Redirect/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
