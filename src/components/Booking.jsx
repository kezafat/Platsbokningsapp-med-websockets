import React, { Component } from 'react';

class Booking extends Component {
constructor(props){
  super(props);
  this.booking = this.props.booking;
  console.log('ho');

}
  render() { 
    
    return ( 
      <div>{this.booking}</div>
     );
  }
}
 
export default Booking;