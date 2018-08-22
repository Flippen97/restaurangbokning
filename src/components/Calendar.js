import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

    
class Calendar extends React.Component {
  state = {
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
                
                for(let i = 0; i < calenderContent.length; i++){
                    let bookingObj = { bdate: calenderContent[i].bdate, btime: calenderContent[i].btime }
                        bookingArray.push(bookingObj);
                }
                
                var counts = {};
                bookingArray.forEach(function(x) { counts[x.bdate] = (counts[x.bdate] || 0)+1; });
                console.log(counts);
                
                console.log(bookingArray);
                
                
                
//                let hej = calenderContent.map(bookingObj => {
//                    let bookingObj = { bdate: calenderContent.bdate, btime: calenderContent.btime }
//                    bookingObj = { bdate: calenderContent.bdate, btime: calenderContent.btime }
////                    console.log(bookingObj);
//                })
//                
//                console.log(hej);
////                let datacopy = [...data[i].bdate];

                
                

//var counts = {};
//datacopy.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
//console.log(counts);
                
//                for(let i = 0; i < datacopy.length; i++){
//                    console.log(datacopy[i].bdate);
//                }
                
                
                
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