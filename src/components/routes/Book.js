import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';

import Calendar from './../Calendar';

import moment from 'moment';

//import DayPicker from 'react-day-picker';
//import 'react-day-picker/lib/style.css';

    
class Book extends React.Component {
  state = {
      
    /*** Booking: ***/
    name: '',
    email: '',
    telephone: '',
    tables: '',
    bdate: '',
    btime: '',
      
    /*** Calendar: ***/
    allBookings: [],
    disabledDates: []
      
  }
    
  /******************************************************/
  /***************** Booking functions ******************/
  /******************************************************/

     /* This function is called from the Calendar component */
     onDayClick = (event) => {
         let selectedDate = event;
         /* Date is formatted to be compatible with disable date-function in calender: */
         selectedDate = moment(selectedDate).format("YYYY[,] MM[,] DD");
         
         this.setState({ bdate: selectedDate }, () => {
            this.isSittingAvailable();
         });
     }

    setTime = (event) => {
        this.setState({ btime: event.target.dataset.btime })
    }

    /* This function sets name, email, telephone states */
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
    
    
  /******************************************************/
  /***************** Availability content ***************/
  /******************************************************/

  
    disabledDates = () => {
        let bookingsArray = this.state.allBookings;
        var counts = {};
        let disabledDatesArray = [];
        /* This counts how many times a specific date has occured in the bookingsArray: */
        bookingsArray.forEach(function(x) { counts [x.bdate] = (counts [x.bdate] || 0)+1; });

        /* This takes bookings that has over 30 counts (= restaurant fully booked) and push them into disabledDates state: */
        for(var key in counts){
            if(counts[key] >= 2){ // LATER ON THIS SHALL BE CHANGED TO 30!
                disabledDatesArray.push(key);
            }
        }
        this.setState({ disabledDates: disabledDatesArray })  
    }
  
    isSittingAvailable = () => {
        
        console.log("hej")
        
        console.log(this.state.bdate);
        
//        let bookingsArray = this.state.allBookings;
//        
//        const result = bookingsArray.filter(day => bookingsArray.bdate === this.state.bdate);
//        console.log(result);
        
        
//        var counts = {};   
//        // This counts how many times a specific date has occured in the bookingsArray: 
//        bookingsArray.forEach(function(x) { counts [x.btime] = (counts [x.btime] || 0)+1; });
//        console.log(counts);
    }

    fetchBookings = () => {
    return fetch("https://www.idabergstrom.se/restaurant-api/product/read.php")
      .then((response) => response.json())
    }
  
    componentDidMount = () => {
        this.fetchBookings()
        .then((data) => { 
            this.setState({ allBookings: data.records }, () => {

            this.disabledDates();
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
  render() {
      

     
    let timepickerText = '';
      
    if(!this.state.bdate){
        timepickerText = `Välkommen till våran bordsbokning! Var god välj ett datum i kalendern.`
    }else if(this.state.bdate && !this.state.btime){
        timepickerText = `Välj en sittning. Du kan välja mellan kl 18 och kl 21.`
    }else if(this.state.bdate && this.state.btime){
        timepickerText = `Nu kan du fylla i dina kontaktuppgifter i formuläret till höger.`
    }

    
    return (
        <React.Fragment>
            <div className="bookContainer">
        
                <div className="bookHeader">
                    <h2>Bordsboking</h2>
                    {timepickerText}
                </div>
        
        
        { /*
                <div className="bookSection">
                    <h3>Välj ett datum:</h3>
        */ }
        
                <Calendar 
                    onDayClick={this.onDayClick} 
                    setTime={this.setTime} 
                    setTables={this.setTables}
                    disabledDates={this.state.disabledDates}
                    bdate={this.state.bdate}
                />
        
        { /*
        
                    Antal personer: <br />
                    <FormInput name="tables" type="text" onChange={this.setTables}/>

                </div>
        
                <div className="bookSection">
                    <h3>Välj en sittning:</h3>
                    
                    <form>
                      <input type="radio" onClick={this.setTime} data-btime="18" /> 18:00 <br />
                      <input type="radio" onClick={this.setTime} data-btime="21" /> 21:00
                    </form>
        
                </div>
        */ }
        
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