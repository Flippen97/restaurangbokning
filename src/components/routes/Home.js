import React from 'react';
import './../../App.css';


function Home(props) {
    return (
        <React.Fragment>
            <div>
                <div className="Rad1">STOCKHOLMS BÄSTA</div>
                <div className="Rad2">ITALIENSKA</div>
                <div className="Rad3">SMAK UPPLEVELSE</div>
                {props.link}
            </div>
        </React.Fragment>
    );
}

export default Home;
/*
<Link to="/book" >Boka Nu</Link>
*/