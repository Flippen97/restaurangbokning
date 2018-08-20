import React from 'react';
import './../App.css';
    

function FormInput(props) {    

    return (    
        <React.Fragment>
           <div className="form-group">
              <label labelfor={props.name}> {props.label} </label>
              <input 
                type={props.type} 
                name={props.name} 
                id={props.name} 
                placeholder={props.state}
                onChange={props.onChange}
                value={props.value}
                disabled={props.state}
              />
            </div>

        </React.Fragment>
    );
}

export default FormInput;
