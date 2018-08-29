import React from 'react';
//import './../App.css';
import Home from './routes/Home'
import Menu from './routes/Menu'
import Book from './routes/Book'
import Contact from './routes/Contact'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

function Nav() {
    
    return (
    <Router>
        <React.Fragment>
        
            <div className="navContainer">
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/book">Boka bord</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
            </div>
        
            <Route exact path="/" component={Home}/>
            <Route path="/menu" component={Menu}/>
            <Route path="/book" component={Book}/>
            <Route path="/contact" component={Contact}/>
        </React.Fragment>
    </Router>
    );
}

export default Nav;