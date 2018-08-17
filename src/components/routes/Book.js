import React from 'react';
import './../../App.css';
import CustomerForm from './../CustomerForm';
import Container from './../styled/Container';

import Calendar from 'react-calendar'

    
class Book extends React.Component {
  state = {
    date: new Date(),
  }

 onChange = date => this.setState({ date })
    
  render() {
    return (
        <React.Fragment>
            <Container width="100%" height="auto">
        
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />

                <CustomerForm />
            </Container>

        </React.Fragment>
    );
  }
}

export default Book;