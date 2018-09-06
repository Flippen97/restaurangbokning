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
            {props.state.name === 'error' ? <span className="error">Namn får bara innehålla bokstäver!</span> : ""}
            <FormInput
                label="Email: "
                type="text" 
                name="email"
                id="emailField" 
                onChange={props.onChange} 
            />
            {props.state.email === 'error' ? <span className="error">Måste vara en email t.ex test@test.com !</span> : ""}
            <FormInput
                label="Telefon: "
                type="text" 
                name="telephone"
                id="telephoneField" 
                onChange={props.onChange}
            />
            {props.state.telephone === 'error' && props.state.name !== '' ? <span className="error">Telefonnumret finns inte i vår databas</span> : ""}
            <input type="checkbox" id="terms" onChange={props.onChange} name="terms" value="terms" /> Ja, jag accepterar FoodFusion allmänna villkor & sekretsspolicy.
      </form>
      
    );
}

export default CustomerForm;