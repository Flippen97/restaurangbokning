import React from 'react';
import './../App.css';
import Home from './routes/Home'
import Book from './routes/Book'
import Contact from './routes/Contact'
import Container from './styled/Container'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

function Nav() {
    return (
    <Router>
        <React.Fragment>
                <Container width="100%" height="140px" color="lightgrey">
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/book">Boka bord</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>

                </Container>
        
                <Route exact path="/" component={Home}/>
                <Route path="/book" component={Book}/>
                <Route path="/contact" component={Contact}/>
        </React.Fragment>
    </Router>
    );
}

export default Nav;