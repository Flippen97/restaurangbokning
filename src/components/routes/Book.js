import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';
import Container from './../styled/Container';

import Calendar from 'react-calendar'

    
class Book extends React.Component {
  state = {
    name: '',
    email: '',
    telephone: '',
    date: new Date(),
    time: '12:00'
  }

 onChange = date => this.setState({ date })
    
  setTime = (event) => {
      this.setState({ time: event.target.dataset.time })
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }
  
  postBooking = () => {
      console.log('Du har nu bokat och dina uppgifter är' + JSON.stringify(this.state));
      
  }
    
  render() {
      
    let liClass;
    if(this.state.date)
    
    return (
        <React.Fragment>
            <div className="bookContainer">
        
                <div className="bookSection">
                    Välj ett datum:
                    <Calendar
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                </div>
        
                <div className="bookSection">
                    Välj en sittning:
                    <ul>
                        <li onClick={this.setTime} data-time="18:00">18:00</li>
                        <li onClick={this.setTime} data-time="21:00">21:00</li>
                    </ul>
                </div>
        
                <div className="bookSection">
                    <CustomerForm onChange={this.handleChange} postBooking={this.postBooking} />
                </div>
        
            </div>
        </React.Fragment>
    );
  }
}

export default Book;