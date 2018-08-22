import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//import Nav from './components/Nav'
import Home from './components/routes/Home'
import Menu from './components/routes/Menu'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'
//import ContainsAll from './components/ContainsAll'



class App extends Component {
    
//    componentDidMount = () => {   
//        fetch('https://www.idabergstrom.se/restaurant-api/product/read.php')
//          .then(function(response) {
//            return response.json();
//          })
//          .then(function(myJson) {
//            console.log(myJson);
//          });
//    }
    
    /***** ADMIN TEST FUNCTIONS, THESE ARE TO BE MOVED LATER TO ADMIN UI *******/
    
    updateBooking = () => {   
        fetch('https://www.idabergstrom.se/restaurant-api/product/update.php', {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            id: '41',
            name: 'Uppdaterat namn',
            email: 'Uppdaterad mail',
            telephone: 'Uppdaterat telefonnummer',
            bdate: 'Uppdaterad dag',
            btime: 'Uppdaterad tid' 
          }) 
        })
          .then(response => response.json())
          .then(fetched => {
            console.log(fetched);
          })
          .catch(error => {
            console.log(error);
          });
    }
    
    deleteBooking = () => {   
        fetch('https://www.idabergstrom.se/restaurant-api/product/delete.php', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            bid: '17'
          }) 
        })
          .then(response => response.json())
          .then(fetched => {
            console.log(fetched);
          })
          .catch(error => {
            console.log(error);
          });
    }
    
    /**************************************************************************/
 
  render() {
    return (
      <Router>
        <React.Fragment>
            <div className="containsAll">
        
                <div className="navContainer">
                    <ul>
                        <li><Link to="/">Hem</Link></li>
                        <li><Link to="/menu">Meny</Link></li>
                        <li><Link to="/book">Boka bord</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
        
                   { /* Just a test button. Remove later:
                    <button onClick={this.deleteBooking}>Testknapp för delete</button> */ }
        
                </div>
        
                <div className="sectionContainer">
                    <div className="sectionBg"></div>
                    <div className="section">
                        <Route exact path="/" component={Home}/>
                        <Route path="/menu" component={Menu}/>
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
