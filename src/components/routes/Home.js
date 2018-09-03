import React from 'react';
import './../../App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'


function Home(props) {
    return (
        <React.Fragment>
        <div>
            <div className="Rad1">STOCKHOLMS BÄSTA</div>
            <div className="Rad2">ITALIENSKA</div>
            <div className="Rad3">SMAK UPPLEVELSE</div>
            <button onClick={props.bookNow}><Link to="/book" >Boka Nu</Link></button>
        </div>

        </React.Fragment>
    );
}

export default Home;