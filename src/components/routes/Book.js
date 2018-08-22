import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';
import FormInput from './../FormInput';

import Calendar from './../Calendar';

//import DayPicker from 'react-day-picker';
//import 'react-day-picker/lib/style.css';

    
class Book extends React.Component {
  state = {
    name: '',
    email: '',
    telephone: '',
    tables: '',
    bdate: '',
    btime: ''
  }

     /* This function is called from the Calendar component */
     onDayClick = (event) => {
         /* Date is converted to a more readable format when set into state */
    //     this.setState({ bdate: event.toLocaleDateString("en-EUR") })
         console.log(event);
         this.setState({ bdate: event })
     }
    
  setTime = (event) => {
      this.setState({ btime: event.target.dataset.btime })
  }
  
  setTables = (event) => {
    /* Calculates number of tables depending on number of guests */
    let tables;
    if((event.target.value % 6) === 0){
        tables = event.target.value / 6;
        console.log(event.target.value + ' guests will need ' + tables + ' tables.');
    }else{
        tables = Math.ceil(parseFloat(event.target.value / 6));
        console.log(event.target.value + ' guests will need ' + tables + ' tables.');
    }
    this.setState({ tables: tables })
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }
  
    postBooking = (event) => {
        
        fetch(`https://www.idabergstrom.se/restaurant-api/product/create.php`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            telephone: this.state.telephone,
            bdate: this.state.bdate,
            btime: this.state.btime,
          }) 
        })
          .then(response => response.json())
          .then(fetched => {
            console.log(fetched);
          })
          .catch(error => {
            console.log(error);
          });
  }

        
//    componentDidMount = () => {   
//        fetch('https://www.idabergstrom.se/restaurant-api/product/read.php')
//          .then(function(response) {
//            return response.json();
//          })
//          .then(function(myJson) {
//            let array = myJson.records;
//                console.log(array);
//            for(let i = 0; i < array.length; i++){
//                console.log(array[i].bdate);
//            }
//          });
//    }
    
    

    

    
  render() {
      

      
    let timepickerText = '';
      
    if(!this.state.date){
        timepickerText = `Välkommen till våran bordsbokning! Var god välj ett datum i kalendern.`
    }else if(this.state.date && !this.state.time){
        timepickerText = `Välj en sittning. Du kan välja mellan kl 18 och kl 21.`
    }else if(this.state.date && this.state.time){
        timepickerText = `Nu kan du fylla i dina kontaktuppgifter i formuläret till höger.`
    }
    
    return (
        <React.Fragment>
            <div className="bookContainer">
                <div className="bookHeader">
                    <h2>Bordsboking</h2>
                    {timepickerText}
                </div>
        
                <div className="bookSection">
                    <h3>Välj ett datum:</h3>

        
                    <Calendar onDayClick={this.onDayClick} />
        
                    Antal personer: <br />
                    <FormInput name="tables" type="text" onChange={this.setTables}/>

                </div>
        
                <div className="bookSection">
                    <h3>Välj en sittning:</h3>
                    
                    <form>
                    { /* Put disabled on these if a date has not yet been picked */ }
                      <input type="radio" onClick={this.setTime} data-btime="18" /> 18:00 <br />
                      <input type="radio" onClick={this.setTime} data-btime="21" /> 21:00
                    </form>
        
                </div>
        
                <div className="bookSection">
                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={this.handleChange} postBooking={this.postBooking} state={this.state.btime}/>
                </div>
        
            </div>
        </React.Fragment>
    );
  }
}

export default Book;