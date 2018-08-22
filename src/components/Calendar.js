import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

    
class Calendar extends React.Component {
  state = {
      allBookings: [],
      disabledDates: ''
  }
    
  disabledDates = () => {
    let bookingsArray = this.state.allBookings;
    let countedBookings = {};
    let disabledDatesArray = []
      
    // This counts how many times a specific date has occured in the bookingsArray: 
    bookingsArray.forEach(function(x) { countedBookings [x.bdate] = (countedBookings [x.bdate] || 0)+1; });
    // This takes bookings that has over 30 counts and push them into disabledDates state:
    for(var key in countedBookings){
        if(countedBookings[key] >= 1){ // Later on, change this to 30! 
             disabledDatesArray.push(key);   
        }
    }  
    this.setState({ disabledDates: disabledDatesArray })
  }
  
    
  setAllBookings = (bookings) => {
      this.setState({ allBookings: bookings })
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
    }
    

    
  render() {
    
    return (
        <React.Fragment>
                <DayPicker onDayClick={this.props.onDayClick} 
                            initialMonth={new Date(2018, 7)}
                            disabledDays={[
                            new Date(2018, 7, 23),
                            new Date(2018, 7, 2)
                            ]}
                    />

        </React.Fragment>
    );
  }
}

export default Calendar;