import React, { Component } from 'react';
import FormInput from './FormInput';
import './../App.css';
//import postCustomer from './post-customer.php';

class CustomerForm extends Component {
    
    state = {
        name: '',
        email: '',
        telephone: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }
    
//    postCustomer = () => {
//        return fetch("https://localhost:3000/post-customer.php", {
//           method: "POST",
//            mode: "no-cors",
//           body:  JSON.stringify({
//                name: this.state.name,
//                email: this.state.email,
//                telephone: this.state.telephone
//            }),
//            headers: {
//                "Content-Type": "application/json"
//            }
//            .then(function(response){ 
//             return response.json();   
//            })
//            .then(function(data){ 
//            console.log(data)
//            })
//        });
//    }


  render() {
    return (  
        
        <form>
            <FormInput
                label="Namn: "
                type="text" 
                name="name"
                className="form-control" 
                id="nameField" 
             /* value={this.state.name} */ 
                onChange={this.handleChange} 
            />
        
            <FormInput
                label="Email: "
                type="text" 
                name="email"
                className="form-control" 
                id="emailField" 
             /* value={this.state.name} */ 
                onChange={this.handleChange} 
            />
        
            <FormInput
                label="Telephone: "
                type="text" 
                name="telephone"
                className="form-control" 
                id="telephoneField" 
             /* value={this.state.name} */ 
                onChange={this.handleChange} 
            />

            <div className="form-group">
                   <button className="btn btn-primary" onClick={this.postCustomer}>Posta ny kund</button>
            </div>
      </form>
      
    );
  }
}

export default CustomerForm;