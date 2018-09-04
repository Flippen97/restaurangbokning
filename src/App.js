import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import Admin from "./components/routes/Admin";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


import Home from "./components/routes/Home";
import Menu from "./components/routes/Menu";
import Book from "./components/routes/Book";
import Contact from "./components/routes/Contact";
import Error from './components/routes/Error';




class App extends Component {
  state = {
    toggleNav: false,
    mainStyle: "containerHome",
    scroll: ""
  };

  componentDidMount = () => {
    //add styling if you go to site from direkturl
    this.checkUrl();
    //check width to see if nav should be displayed
    this.widthCheck();
    window.addEventListener("resize", this.widthCheck);
    window.addEventListener("scroll", this.handleScroll);
  };

  checkUrl = () => {
    if (window.location.href.indexOf("menu") > -1) {
      this.setState({ mainStyle: "containerMenu" });
    } else if (window.location.href.indexOf("book") > -1) {
      this.setState({ mainStyle: "containerBook" });
    } else if (window.location.href.indexOf("contact") > -1) {
      this.setState({ mainStyle: "containerContact" });
    } else {
      this.setState({ mainStyle: "containerHome" });
    }
  };

  handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll > 160) {
      this.setState({ scroll: "blackbackground" });
    } else {
      this.setState({ scroll: "" });
    }
  };

  widthCheck = () => {
    var width = window.innerWidth;
    if (width > 1000) {
      this.setState({ toggleNav: true });
    } else {
      this.setState({ toggleNav: false });
    }
  };

  toggleNav = () => {
    this.setState({ toggleNav: !this.state.toggleNav });
  };

  mainStyle = input => {
    this.setState({ mainStyle: input });
    var width = window.innerWidth;
    if (width > 1000) {
      this.setState({ toggleNav: true });
    } else {
      this.setState({ toggleNav: false });
    }
   };

   bookNow = () =>{
        console.log("hej")
        this.setState({ mainStyle: "containerBook" });
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
              <i
                className="fa fa-bars"
                aria-hidden="true"
                onClick={this.toggleNav}
              />
            </header>

            {this.state.toggleNav ? (
              <nav className="navContainer">
                <ul>
                  <li onClick={() => this.mainStyle("containerHome")}>
                    <Link to="/">Hem</Link>
                  </li>
                  <li onClick={() => this.mainStyle("containerMenu")}>
                    <Link to="/menu">Meny</Link>
                  </li>
                  <li onClick={() => this.mainStyle("containerBook")}>
                    <Link to="/book">Boka bord</Link>
                  </li>
                  <li onClick={() => this.mainStyle("containerContact")}>
                    <Link to="/contact">Kontakt</Link>
                  </li>
                </ul>
              </nav>
                ) : (
                <React.Fragment />
                )}
                
        
                <div className="sectionContainer">

                    <div className="section">

                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} link={<button><Link to="/book" className="bookNowButton" onClick={this.bookNow}>Boka Nu</Link></button>} />}/>
                        <Route path="/menu" component={Menu}/>
                        <Route path="/book" component={Book}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/admin" component={Admin}/>
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
