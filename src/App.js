import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomerForm from './components/CustomerForm'
import Nav from './components/Nav'
import Home from './components/routes/Home'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'

import Container from './components/styled/Container'
import bgimg from './img/bg.jpg';


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
 
  render() {
    return (
      <Router>
        <React.Fragment>
        
            <Container width="100%" height="100vh" bgcolor="lightgrey" backgroundimg={bgimg}>
                <Nav />
            </Container>
        
            <Route path="/book" component={Book}/>
            <Route path="/contact" component={Contact}/>
         </React.Fragment> 
        </Router>
    );
  }
}

export default App;
