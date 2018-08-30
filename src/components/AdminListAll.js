import React from 'react';
import './../App.css';
    

class AdminListAll extends React.Component {
    
    state = {
        allBookings: []
    }
    
    componentDidMount = () => {
        this.setState({ allBookings: this.props.allBookings }), () => {
            console.log(this.state.allBookings);
        };
    }
    
    render () {
        
        

        return (    
            <React.Fragment>
               <div>
                  
            
                </div>

            </React.Fragment>
        );
    }
}

export default AdminListAll;
