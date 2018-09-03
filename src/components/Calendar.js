import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import FormInput from './FormInput';
import 'react-day-picker/lib/style.css';
import CustomerForm from './CustomerForm';

    
function Calendar(props) {
    if(props.state.bdate !== ''){
    var formate = props.state.bdate.split(", ");
    var formateDate = formate[2]+"-"+formate[1]+"-"+formate[0]
    }
    return (
        <React.Fragment>
        
            
            {props.state.bookingStep === "1" ? (
                <div className="bookSection">
                <h3>Välj ett datum:</h3>
                <div className="divideSpace">
                <DayPicker 
                    onDayClick={props.onDayClick}
                    selectedDays={props.state.selectedDate}
                    initialMonth={new Date(2018, 7)}
                    disabledDays={ props.state.disabledDates.map((date) => new Date(date)) }
                />
                <span className="chosenDate">Valt datum: <br />{formateDate}</span>
                </div>
                <button className="nextButton" onClick={props.changeBokingStep} disabled={props.state.bdate === ''} value={"2"}>Nästa</button>
                </div>) 
                : (<React.Fragment />)}


            {props.state.bookingStep === "2" ? (
                <div className="bookSection">
                    <h3>Välj en sittning:</h3>
                    <form>
                        {props.state.availableAt18 ? <label className="radio inline"><input type="radio" onClick={props.setTime} data-btime="18" name="time" /><span>18:00</span></label>: <React.Fragment />}
                        {props.state.availableAt21 ? <label className="radio inline"><input type="radio" onClick={props.setTime} data-btime="21" name="time" /><span>21:00</span></label>: <React.Fragment />}
                    </form>
                    Antal personer: <br />
                    <select id="single" name="numberOfGuests" onChange={props.onChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
            {/*<FormInput name="numberOfGuests" type="text" onChange={props.onChange} />*/}
                    <button className="nextButton" onClick={props.changeBokingStep} disabled={props.state.btime === '' || props.state.numberOfGuests === ''} value={"3"}>Nästa</button>
                </div>) 
            : (<React.Fragment />)}
            

            {props.state.bookingStep === "3" ? (
                <div className="bookSection">
                    <h3>Bokat tidigare? V.g. fyll i telefonnummer: </h3>
                    <FormInput onChange={props.onChange} name="telephone" type="text"/>
                    {props.state.telephone === 'error' ? <span className="error">Telefonnumret finns inte i vår databas</span> : ""}
                    <button className="nextButton" onClick={props.allreadyCustomer}> Boka! </button>

                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={props.onChange}/>
                    <button className="nextButton" 
                            onClick={(event)=>{props.postBooking(); props.changeBokingStep(event);}} 
                            value={"4"}>
                        BOKA NU!!
                    </button>

                </div>) 
            : (<React.Fragment />)}



            {props.state.bookingStep === "4" ? (
                <div className="bookSection">
                    Tack för din bokning {props.state.name}!!
                    <button className="nextButton" 
                            onClick={props.changeBokingStep} 
                            value={"1"}>
                        Tillbaka
                    </button>
                </div>) 
            : (<React.Fragment />)}

        </React.Fragment>
    );

}

export default Calendar;