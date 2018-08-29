import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import FormInput from './FormInput';
import 'react-day-picker/lib/style.css';

    
function Calendar(props) {
    
    return (
        <React.Fragment>
        
            
            {props.bookingStep === "1" ? (
                <div className="bookSection">
                <h3>Välj ett datum:</h3>
                <DayPicker 
                    onDayClick={props.onDayClick}
                    selectedDays={props.selectedDate}
                    initialMonth={new Date(2018, 7)}
                    disabledDays={ props.disabledDates.map((date) => new Date(date)) }
                />
                <span className="chosenDate">Valt datum: {props.bdate}</span>
                <button className="nextButton" onClick={props.changeBokingStep} disabled={props.bdate === ''} value={"2"}>Nästa</button>
                </div>) 
                : (<React.Fragment />)}



            {props.bookingStep === "2" ? (
                <div className="bookSection">
                    <h3>Välj en sittning:</h3>
                    <form>
                    { /* Put disabled on these if a date has not yet been picked */ }
                        <input type="radio" onClick={props.setTime} data-btime="18" /> 18:00 <br />
                        <input type="radio" onClick={props.setTime} data-btime="21" /> 21:00
                    </form>
                    Antal personer: <br />
                    <FormInput name="tables" type="text" />
                    <button onClick={props.changeBokingStep} disabled={props.bdate === ''} value={"3"}>Nästa</button>
                </div>) 
            : (<React.Fragment />)}


        </React.Fragment>
    );

}

export default Calendar;