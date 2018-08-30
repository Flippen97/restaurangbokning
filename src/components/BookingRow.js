import React from 'react';
import './../App.css';
import 'font-awesome/css/font-awesome.min.css';
    

function BookingRow(props) {    

    return (    
        <React.Fragment>
           <div className="bookingRowContainer">
                <div className="bookingRowCell">
                    <button onClick={props.deleteBooking} value={props.bid}> X </button>
                    | upd | {props.bid} </div>
                <div className="bookingRowCell">{props.name}</div>
                <div className="bookingRowCell">{props.telephone}</div>
                <div className="bookingRowCell">{props.email}</div>
                <div className="bookingRowCell">{props.bdate}</div>
                <div className="bookingRowCell">{props.btime}</div>
            </div>

        </React.Fragment>
    );
}

export default BookingRow;
