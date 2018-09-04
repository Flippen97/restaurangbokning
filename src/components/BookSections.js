import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import FormInput from './FormInput';
import 'react-day-picker/lib/style.css';
import CustomerForm from './CustomerForm';
import Select from 'react-select';



function BookSections(props) {
    if(props.state.bdate !== ''){
    var formate = props.state.bdate.split(", ");
    var formateDate = formate[0]+"-"+formate[1]+"-"+formate[2]
    }
    const { selectedOption } = props.state.numberOfGuests;
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' }
      ];
    return (
        <React.Fragment>
        
            
            {props.state.bookingStep === "1" ? (
                <div className="bookSection">
                <h3>Välj ett datum:</h3>
                <div className="divideSpace">
                <DayPicker 
                    onDayClick={props.onDayClick}
                    selectedDays={props.state.selectedDate}
                    month={new Date()}
                    toMonth={new Date(2018, 11)}
                    disabledDays={ props.state.disabledDates.map((date) => new Date(date))}
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
                    <Select
                        className={"selectMenu"}
                        placeholder="Antal personer"
                        value={selectedOption}
                        onChange={props.onChangeSelect}
                        options={options}
                    />

                    <button className="nextButton" onClick={props.changeBokingStep} disabled={props.state.btime === '' || props.state.numberOfGuests === ''} value={"3"}>Nästa</button>
                
                </div>) 
            : (<React.Fragment />)}
            

            {props.state.bookingStep === "3" ? (
                <div className="bookSection">
                    <h3>Bokat tidigare? V.g. fyll i telefonnummer: </h3>
                    <FormInput onChange={props.onChange} name="telephone" type="text"/>
                    {props.state.telephone === 'error' && props.state.name === '' ? <span className="error">Telefonnumret finns inte i vår databas</span> : ""}
                    <button className="nextButton" onClick={(event)=>{ props.changeBokingStep(event);}} disabled={props.state.telephone === '' || props.state.name !== ''} value={"4"}> Boka! </button>

                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={props.onChange} state={props.state}/>
                    
                    <button className="nextButton" 
                            onClick={(event)=>{props.postBooking(); props.changeBokingStep(event);}} 
                            value={"4"}
                            disabled={props.state.telephone === '' || props.state.telephone === 'error' || props.state.name === '' || props.state.name === 'error' || props.state.email === '' || props.state.email === 'error'}
                            >
                        BOKA NU!!
                    </button>

                </div>) 
            : (<React.Fragment />)}



            {props.state.bookingStep === "4" ? (
                <div className="bookSection">
                    {props.state.name ? ` ${props.state.name}` : ""}, tack för din bokning hos oss!<br /><br />
                    Du är varmt välkommen den {formateDate} klockan {props.state.btime}.00, {props.state.numberOfGuests} personer<br /><br />
                    För avbokning vänligen kontakta oss via telefon eller email.<br />
                    070-000 00 00, FoodFusion@FoodFusion.com.

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

export default BookSections;