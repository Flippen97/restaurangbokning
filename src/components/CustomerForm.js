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
//               { /* className="form-control" */ }
                id="nameField" 
                onChange={props.onChange} 
                state={props.state}
            />
        
            <FormInput
                label="Email: "
                type="text" 
                name="email"
//                { /* className="form-control" */ }
                id="emailField" 
                onChange={props.onChange} 
            />
        
            <FormInput
                label="Telephone: "
                type="text" 
                name="telephone"
//               { /* className="form-control" */ }
                id="telephoneField" 
                onChange={props.onChange}
            />

            <div className="form-group">
{ /*                   <button className="btn btn-primary" onClick={props.postBooking}>Posta ny kund</button> */ }
                <input type="submit" onClick={props.postBooking} value="Posta ny kund" state={props.state}/>
            </div>
      </form>
      
    );
}

export default CustomerForm;