import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//import Nav from './components/Nav'
import Home from './components/routes/Home'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'
//import ContainsAll from './components/ContainsAll'



class App extends Component {
    
componentDidMount = () => {   
    fetch('https://www.idabergstrom.se/product/read.php')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
}
 
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
