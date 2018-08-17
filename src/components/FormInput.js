import React from 'react';
import './../App.css';

function FormInput(props) {
    return (
        <React.Fragment>
        
           <div className="form-group">
              <label labelfor={props.name}> {props.label} </label>
                <input 
                    type={props.name} 
                    name={props.name} 
                    className={props.className} 
                    id={props.name} 
                    placeholder={props.name}
                    onChange={props.onChange}
                    value={props.value}
                />
            </div>

        </React.Fragment>
    );
}

export default FormInput;
