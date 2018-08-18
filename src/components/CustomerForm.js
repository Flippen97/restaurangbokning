import React, { Component } from 'react';
import FormInput from './FormInput';
import './../App.css';

function CustomerForm(props) {    
    return (  
        
        <form>
            <FormInput
                label="Namn: "
                type="text" 
                name="name"
                className="form-control" 
                id="nameField" 
             /* value={this.state.name} */ 
                onChange={props.onChange} 
            />
        
            <FormInput
                label="Email: "
                type="text" 
                name="email"
                className="form-control" 
                id="emailField" 
             /* value={this.state.name} */ 
                onChange={props.onChange} 
            />
        
            <FormInput
                label="Telephone: "
                type="text" 
                name="telephone"
                className="form-control" 
                id="telephoneField" 
             /* value={this.state.name} */ 
                onChange={props.onChange} 
            />

            <div className="form-group">
                   <button className="btn btn-primary" onClick={props.postBooking}>Posta ny kund</button>
            </div>
      </form>
      
    );
}

export default CustomerForm;