import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import FormInput from './FormInput';
import 'react-day-picker/lib/style.css';

    
function Calendar(props) {

    return (
        <React.Fragment>
        
            <div className="bookSection">
                <h3>Välj ett datum:</h3>

                <DayPicker 
                    onDayClick={props.onDayClick} 
                    initialMonth={new Date(2018, 7)}
                    disabledDays={ props.disabledDates.map((date) => new Date(date)) }
                />

                Antal personer: <br />
                <FormInput name="tables" type="text" onChange={props.setTables}/>

            </div>
        
            <div className="bookSection">
                <h3>Välj en sittning:</h3>

                <form>
                { /* Put disabled on these if a date has not yet been picked */ }
                  <input type="radio" onClick={props.setTime} data-btime="18" /> 18:00 <br />
                  <input type="radio" onClick={props.setTime} data-btime="21" /> 21:00
                </form>

            </div>

        </React.Fragment>
    );

}

export default Calendar;