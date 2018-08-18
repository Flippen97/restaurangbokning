import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import CustomerForm from './components/CustomerForm'
import Nav from './components/Nav'
import Home from './components/routes/Home'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'
import ContainsAll from './components/ContainsAll'

import Container from './components/styled/Container'
import bgimg from './img/bg.jpg';


class App extends Component {
 
  render() {
    return (
      <Router>
        <React.Fragment>
            <div className="containsAll">
        
                <div className="navContainer">
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/book">Boka bord</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
                </div>
        
                <div className="sectionContainer">
                    <div className="sectionBg"></div>
                    <div className="section">
                        <Route exact path="/" component={Home}/>
                        <Route path="/book" component={Book}/>
                        <Route path="/contact" component={Contact}/>
                    </div>
                </div>
        
            </div>
         </React.Fragment> 
        </Router>
    );
  }
}

export default App;
