import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//import Nav from './components/Nav'
import Home from './components/routes/Home'
import Menu from './components/routes/Menu'
import Book from './components/routes/Book'
import Contact from './components/routes/Contact'
//import ContainsAll from './components/ContainsAll'
import Error from './components/routes/Error'


class App extends Component {
    state = {
        toggleNav: false,
        mainStyle: "containerHome",
        scroll: ""
    };
   componentDidMount = () => {   
//        fetch('https://www.idabergstrom.se/restaurant-api/product/read.php')
//          .then(function(response) {
//            return response.json();
//          })
//          .then(function(myJson) {
//            console.log(myJson);
//          });
        //add styling if you go to site from direkturl
        this.checkUrl();
        //check width to see if nav should be displayed
        this.widthCheck();
        window.addEventListener("resize", this.widthCheck)
        window.addEventListener('scroll', this.handleScroll);
    }
    
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
    checkUrl = () =>{
        if(window.location.href.indexOf("menu") > -1) {
            this.setState({ mainStyle: "containerMenu" });
        }else if(window.location.href.indexOf("book") > -1) {
            this.setState({ mainStyle: "containerBook" });
        }else if(window.location.href.indexOf("contact") > -1) {
            this.setState({ mainStyle: "containerContact" });
        }else {
            this.setState({ mainStyle: "containerHome" });
        }
    }
    handleScroll = () =>{
        const scroll = window.scrollY;
        if(scroll>160){
            this.setState({ scroll: "blackbackground" });
        }else{
            this.setState({ scroll: "" });
        }
        console.log(scroll)
    }
    widthCheck = () =>{
        var width = window.innerWidth;
        if(width>1000){
            this.setState({ toggleNav: true });
        }
        else{
            this.setState({ toggleNav: false });
        }
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
        var width = window.innerWidth;
        if(width>1000){
            this.setState({ toggleNav: true });
        }else{
            this.setState({ toggleNav: false });
        }
    }
    

 
  render() {
    return (
      <Router>
        <React.Fragment>
            <div className={this.state.mainStyle}>

                <header className={this.state.scroll}>
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
                    {/* this.state.mainStyle != "containerHome" ? (<div className="headerImg"></div>) : (<React.Fragment /> )*/}
                    <div className="section">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/menu" component={Menu}/>
                        <Route path="/book" component={Book}/>
                        <Route path="/contact" component={Contact}/>
                        <Route component={Error} />
                    </Switch>
                    </div>
                </div>
        
            </div>
         </React.Fragment> 
        </Router>
    );
  }
}

export default App;
