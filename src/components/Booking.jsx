import React, { Component } from 'react';

class Booking extends Component {
constructor(props){
  super(props);
  this.auditorium = this.props.auditorium;
}
  render() { 
    
    return ( 
      <div>{this.props.show}</div>
     );
  }
}
 
export default Booking;