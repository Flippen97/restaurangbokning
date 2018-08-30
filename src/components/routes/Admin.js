import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';
import BookingRow from './../BookingRow';
import AdminListAll from './../AdminListAll';
import moment from 'moment';

//import DayPicker from 'react-day-picker';
//import 'react-day-picker/lib/style.css';

    
class Admin extends React.Component {
    
    state = {
        view: 'listOfAllBookings',  
        allBookings: [],
    }

    
    deleteBooking = (event) => {  
        fetch('https://www.idabergstrom.se/restaurant-api/deleteBooking.php', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            bid: event.target.value
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
    
    fetchBookings = () => {
    return fetch("https://www.idabergstrom.se/restaurant-api/fetchAllGuests.php")
      .then((response) => response.json())
    }
  
    componentDidMount = () => {
        this.fetchBookings()
//        fetch("https://www.idabergstrom.se/restaurant-api/fetchAll.php")
//      .then((response) => response.json())
        .then((data) => { 
            this.setState({ allBookings: data });
            console.log(this.state.allBookings);
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    generateList = () => {
        let rows = [];

        for(let i = 0; i < this.state.allBookings.length; i++){
            
            rows.push(<BookingRow 
                      deleteBooking={this.deleteBooking}
                      bid={this.state.allBookings[i].bid} 
                      id={this.state.allBookings[i].id} 
                      name={this.state.allBookings[i].name} 
                      telephone={this.state.allBookings[i].telephone} 
                      email={this.state.allBookings[i].email} 
                      bdate={this.state.allBookings[i].bdate} 
                      btime={this.state.allBookings[i].btime} 
                      numberOfGuests={this.state.allBookings[i].numberOfGuests} 
                      />
                     );
        } 
        
        return rows;

    }
    
    
  render() {
      
                
//      let view;
//      
////      if(!this.state.allBookings === []){
//      
//        view = <React.Fragment> {this.state.allBookings[1].name} </React.Fragment>
////    }

    
    return (
        <React.Fragment>
            <div className="headerImg">
              { /*  <h2>ADMIN</h2><br /> */ }
        { /* <button onClick={this.postBooking}>Testknapp för boka!</button> */ }
            </div>
            <div className="bookContainer">
        
                <div className="listContainer">
                    { this.generateList() }
                </div>
        
            </div>
        </React.Fragment>
    );
  }
}

export default Admin;