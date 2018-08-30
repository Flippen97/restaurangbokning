import React from 'react';
import './../../App.css';

import CustomerForm from './../CustomerForm';
import FormInput from './../FormInput';

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
    bdate: '',
    btime: '',
    numberOfGuests: '',
    customerId: '',
    selectedDate: undefined,
    /*** Calendar: ***/
    allBookings: [],
    disabledDates: [],
    availableAt18: true,
    availableAt21: true,
    /*** How far they have come in booking ***/
    bookingStep: "1",


  }
    
  /******************************************************/
  /***************** Booking functions ******************/
  /******************************************************/

     /* This function is called from the Calendar component */
    onDayClick = (event,  modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }
        this.setState({ selectedDate: event})
        let selectedDate = event;
        /* Date is formatted to be compatible with disable date-function in calender: */
        selectedDate = moment(selectedDate).format("YYYY[,] MM[,] DD");
         
         this.setState({ bdate: selectedDate }, () => {
             /* If a date is selected, we need to check which times are available on that date, 
             so we are running another function to check that: isSittingAvailable() */
            this.isSittingAvailable();
        });
    }
    changeBokingStep = (event) => {
        this.setState({ bookingStep: event.target.value}) 
    }
    setTime = (event) => {
        this.setState({ btime: event.target.dataset.btime})
    }
//    setNumberOfGuests = () => {
//        console.log(this);
////        this.setState({ numberOfGuests: this.target.value})
//    }

    /* This function sets name, email, telephone states */
    handleChange = (event) => {
        let email = event.target.value; 
        
        /* Email only pushed to state if it's valid. If empty state, the user will not be allowed to book. */
        if(event.target.name === 'email'){
            if(this.validateEmail(email)){
                this.setState({ email : email })
            } 
        }else{
            this.setState({ [event.target.name] : event.target.value })
        }
    }
    
    validateEmail(emailToValidate){
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(emailToValidate).toLowerCase());
    }
    /* "But keep in mind that one should not rely only upon JavaScript validation. JavaScript can easily be disabled. This should be validated on the server side as well." */
  
    postBooking = () => {

        fetch(`https://www.idabergstrom.se/restaurant-api/create.php`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                telephone: this.state.telephone,
                bdate: this.state.bdate,
                btime: this.state.btime,
                numberOfGuests: this.state.numberOfGuests,
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
    
    postBookingWithCustomerId = () => {
        

                    console.log(this.state.btime)
                    console.log(this.state.bdate)
                    console.log(this.state.customerId)
                    console.log(this.state.numberOfGuests)

        fetch(`https://www.idabergstrom.se/restaurant-api/createWithCustomerId.php`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
                bdate: this.state.bdate,
                btime: this.state.btime,
                numberOfGuests: this.state.numberOfGuests,
                customerId: this.state.customerId
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
        bookingsArray.forEach(function(x) { counts[x.bdate] = (counts[x.bdate] || 0)+1; });

        /* This takes bookings that has over 30 counts (= restaurant fully booked) and push them into disabledDates state: */
        for(var key in counts){
            if(counts[key] >= 2){ // LATER ON THIS SHALL BE CHANGED TO 29!
                disabledDatesArray.push(key);
            }
        }
        this.setState({ disabledDates: disabledDatesArray })  
    }
  
    isSittingAvailable = () => {
        /* NOT TESTED! HAVE TO TEST WHEN MORE CONTENT IN DB!!!! */
        let selectedDate = this.state.bdate;
        let bookingsArray = this.state.allBookings;
        
        const bookingsAt18 = bookingsArray.filter((day) => ((day.bdate === selectedDate) && (day.btime === '18')));
        const bookingsAt21 = bookingsArray.filter((day) => ((day.bdate === selectedDate) && (day.btime === '21')));
        
        /* There are 15 tables, but we have to count with 14 here because of how array works: */
        if(bookingsAt18.length >= 14){
            this.setState({ availableAt18: false }) 
        }
        if(bookingsAt21.length >= 14){
            this.setState({ availableAt21: false }) 
        }
    }
    
    allreadyCustomer = () => {

        fetch('https://www.idabergstrom.se/restaurant-api/fetchOneWithTelephone.php', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            telephone: this.state.telephone
          }) 
        })
          .then(response => response.json())
          .then(data => {
             this.setState({ 
                    customerId: data[0].id, 
                }, () => {
                  this.postBookingWithCustomerId();
                })
          })
          .catch(error => {
            console.log(error);
          });
    }

    fetchBookings = () => {
    return fetch("https://www.idabergstrom.se/restaurant-api/fetchAllGuests.php")
      .then((response) => response.json())
    }
  
    componentDidMount = () => {
        this.fetchBookings()
        .then((data) => { 
            this.setState({ allBookings: data }, () => {
                this.disabledDates();
                console.log(this.state.allBookings)
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
            <div className="headerImg">
                <h2>Boka bord</h2>
            </div>
            <div className="bookContainer">
        
                <div className="bookHeader">
                    <h2>Bordsboking</h2>
                    {timepickerText}
                </div>
        
                <Calendar 
                    onDayClick={this.onDayClick} 
                    setTime={this.setTime} 
                    setTables={this.setTables}
                    disabledDates={this.state.disabledDates}
                    bdate={this.state.bdate}
                    selectedDate={this.state.selectedDate}
                    bookingStep={this.state.bookingStep}
                    changeBokingStep={this.changeBokingStep}
                    setNumberOfGuests={this.setNumberOfGuests}
                    onChange={this.handleChange}
                    postBooking={this.postBooking}
                />
        
        
                {this.state.bookingStep === "3" ? (
                <div className="bookSection">
        
                    Bokat tidigare? V.g. fyll i telefonnummer: 
                    <FormInput onChange={this.handleChange} name="telephone" />
                    <button onClick={this.allreadyCustomer}> Boka! </button>
        
        
                    <h3>Dina uppgifter:</h3>
                    <CustomerForm onChange={this.handleChange} postBooking={this.postBooking} state={this.state.btime}/>
                    <button>Nästa</button>
                </div>) 
                : (<React.Fragment />)}
        

            </div>
        </React.Fragment>
    );
  }
}

export default Book;