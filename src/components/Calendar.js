import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import FormInput from './FormInput';
import 'react-day-picker/lib/style.css';
import CustomerForm from './CustomerForm';

    
function Calendar(props) {
    
    return (
        <React.Fragment>
        
            
            {props.bookingStep === "1" ? (
                <div className="bookSection">
                <h3>Välj ett datum:</h3>
                <DayPicker 
                    onDayClick={props.onDayClick}
                    selectedDays={props.selectedDate}
//                    initialMonth={new Date(2018, 7)}
                    month={new Date()}
                    toMonth={new Date(2018, 11)}
                    disabledDays={ props.disabledDates.map((date) => new Date(date)) }


//                disabledDays={[ props.disabledDates.map((date) => new Date(date)), 
//                              {
////                               after: new Date(2017, 3, 20),
//                                before: new Date(),
//                            }, ]}

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
                        <input type="radio" onClick={props.setTime} disabled={!props.availableAt18} data-btime="18" /> 18:00 <br />
                        <input type="radio" onClick={props.setTime} disabled={!props.availableAt21} data-btime="21" /> 21:00
                    </form>
                    Antal personer: <br />
                    <FormInput name="numberOfGuests" type="text" onChange={props.onChange} />
                    <button onClick={props.changeBokingStep} disabled={props.bdate === ''} value={"3"}>Nästa</button>
                </div>) 
            : (<React.Fragment />)}
            
            {props.bookingStep === "3" ? (
                <div className="bookSection">
                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={props.onChange}/>
                    <button onClick={props.postBooking}>BOKA NU!!</button>
                </div>) 
            : (<React.Fragment />)}

        </React.Fragment>
    );

}

export default Calendar;