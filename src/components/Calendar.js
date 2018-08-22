import React from 'react';
import './../App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

    
class Calendar extends React.Component {
  state = {
  }

    
    componentDidMount = () => {   
        fetch('https://www.idabergstrom.se/restaurant-api/product/read.php')
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            let array = myJson.records;
                console.log(array);
            for(let i = 0; i < array.length; i++){
                console.log(array[i].bdate);
            }
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