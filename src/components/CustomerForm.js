import React from 'react';
import FormInput from './FormInput';
import './../App.css';

function CustomerForm(props) {    
    return (  
        
        <form>
            <FormInput
                label="Namn: "
                type="text" 
                name="name"
                id="nameField" 
                onChange={props.onChange} 
            />
        
            <FormInput
                label="Email: "
                type="text" 
                name="email"
                id="emailField" 
                onChange={props.onChange} 
            />
        
            <FormInput
                label="Telefon: "
                type="text" 
                name="telephone"
                id="telephoneField" 
                onChange={props.onChange}
            />

            <div className="form-group">
                <input type="submit" onClick={props.postBooking} value="Posta ny kund" state={props.state}/>
            </div>
      </form>
      
    );
}

export default CustomerForm;