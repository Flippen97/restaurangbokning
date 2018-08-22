import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

    
class Calendar extends React.Component {
  state = {
      allBookings: {},
      disabledDates: ''
  }
    
  setDisabledDates = (date) => {
      this.setState({ disabledDates: date })
  }
  
    
  setAllBookings = (bookings) => {
      this.setState({ allBookings: bookings })
  }
  


    countBookings = (fetchedArray) => {
        console.log(fetchedArray); 
    }


    
    componentDidMount = () => {
            fetch('https://www.idabergstrom.se/restaurant-api/product/read.php')
              .then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                let data = myJson.records;
                
                let calenderContent = [...data];
                let bookingArray = [];
                let disabledDatesArray = []
                
                for(let i = 0; i < calenderContent.length; i++){
                    let bookingObj = { bdate: calenderContent[i].bdate, btime: calenderContent[i].btime }
                    bookingArray.push(bookingObj);
                }
                 
                // This counts how many times a specific date has occured in the bookingsArray. 
                var counts = {};
                bookingArray.forEach(function(x) { counts[x.bdate] = (counts[x.bdate] || 0)+1; });
                console.log(counts);

                
                for(var key in counts){
//                    console.log(key);
//                    console.log(counts[key]);
//                       console.log(this);
                    if(counts[key] >= 1){ // Later on, change this to 30! 
                         disabledDatesArray.push(key);   
                    }
                }
                
                console.log(disabledDatesArray);


              });  

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