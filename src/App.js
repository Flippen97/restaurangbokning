import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
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
    state = {
        toggleNav: false,
        mainStyle: "containerHome"
    };
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
        fetch('https://www.idabergstrom.se/restaurant-api/update.php', {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            id: '24',
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
        fetch('https://www.idabergstrom.se/restaurant-api/deleteBooking.php', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            bid: '20'
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
    
    /* searchBooking = () => {   
        fetch('https://www.idabergstrom.se/restaurant-api/search.php', {
          method: 'POST',
          mode: 'cors',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
          body: JSON.stringify({
            keywords: 'Pelle'
          }) 
        })
          .then(response => response.json())
          .then(fetched => {
            console.log(fetched);
          })
          .catch(error => {
            console.log(error);
          });
    } */
    
    /**************************************************************************/
    
    toggleNav = () =>{
        this.setState({ toggleNav: !this.state.toggleNav });
    }
    mainStyle = (input) =>{
        this.setState({ mainStyle: input });
        this.setState({ toggleNav: false });
        console.log(this.state)
    }
    

 
  render() {
    return (
      <Router>
        <React.Fragment>
            <div className={this.state.mainStyle}>

                <header>
                    <h1>Food Fusion</h1>
                    <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleNav}></i>
                </header>

                {this.state.toggleNav ? (
                    <nav className="navContainer">
                        <ul>
                            <li onClick={() => this.mainStyle("containerHome")}><Link to="/">Hem</Link></li>
                            <li onClick={() => this.mainStyle("containerMenu")}><Link to="/menu">Meny</Link></li>
                            <li onClick={() => this.mainStyle("containerBook")}><Link to="/book">Boka bord</Link></li>
                            <li onClick={() => this.mainStyle("containerContact")}><Link to="/contact">Kontakt</Link></li>
                        </ul>
                    { /* Just a test button. Remove later: */ }
                    <button onClick={this.deleteBooking}>Testknapp för delete</button>
                    <button onClick={this.updateBooking}>Testknapp för uppdatering</button>
                    <button onClick={this.searchBooking}>Testknapp för sök</button>
                    </nav>
                ) : (
                <div />
                )}
                
        
                <div className="sectionContainer">
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
