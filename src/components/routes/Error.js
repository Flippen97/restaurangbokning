import React from 'react';
import './../../App.css';


function Error() {
    return (
        <React.Fragment>
         { /* User will see an error message if they will write in the url a page that doesnt exist*/}
          <h1>Error: Tyvärr kunde sidan du sökte efter inte hittas för att den inte finns,försök gärna igen</h1>

        </React.Fragment>
    );
}

export default Error;