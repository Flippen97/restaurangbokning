import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';

import Calendar from 'react-calendar'

    
class Book extends React.Component {
  state = {
    name: '',
    email: '',
    telephone: '',
    date: '',
//    date: '',
    time: ''
  }

 onChange = date => this.setState({ date })
    
  setTime = (event) => {
      this.setState({ time: event.target.dataset.time })
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }
//  
//  postBooking = (event) => {
//      event.preventDefault();
//      console.log('Du har nu bokat och dina uppgifter är' + JSON.stringify(this.state));  
//  }

  
    postBooking = (event) => {
        event.preventDefault();
        
//        fetch("https://www.idabergstrom.se/product/create.php", {
//          method: "POST",
//          mode: "cors",
//          body: JSON.stringify({
//            name: this.state.name,
//            email: this.state.email,
//            telephone: this.state.telephone,
//            date: 'a date',
//            time: '14:00',
//          })
//        })
//          .then((response) => response.json())
//        )};
        

    fetch(
      `https://www.idabergstrom.se/product/create.php?name=${this.state.name}&email=${this.state.email}&telephone=${this.state.telephone}&bdate=hej&btime=alsohej`, {
          method: "POST",
          mode: "cors" 
      }
        )
          .then(response => response.json())
          .then(fetched => {
            console.log(fetched);
          })
          .catch(error => {
            console.log(error);
          });

    }
    
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
                    <Calendar
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                </div>
        
                <div className="bookSection">
                    <h3>Välj en sittning:</h3>
                    
                    <form>
                    { /* Put disabled on these if a date has not yet been picked */ }
                      <input type="radio" onClick={this.setTime} data-time="18:00" /> 18:00 <br />
                      <input type="radio" onClick={this.setTime} data-time="21:00" /> 21:00
                    </form>
        
                </div>
        
                <div className="bookSection">
                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={this.handleChange} postBooking={this.postBooking} state={this.state.time}/>
                </div>
        
            </div>
        </React.Fragment>
    );
  }
}

export default Book;