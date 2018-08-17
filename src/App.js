import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerForm from './components/CustomerForm'
import Nav from './components/Nav'
import Home from './components/routes/Home'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
             <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
                </p>
        
                <Nav />
                <CustomerForm />
        
              </div>
        
              <Route exact path="/" component={Home} />
              <Route path="/book" component={Book} />
              <Route path="/contact" component={Contact} />
         </React.Fragment> 
        </Router>
    );
  }
}

export default App;
