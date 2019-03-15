import React, { Component } from 'react';

class Toplist extends Component {
  constructor(){
    super()
    this.state = { fetched: false }
    this.fetchBookings();
  }
  async fetchBookings() {
    const response = await fetch(`http://localhost:3000/json/bookings/`)
    this.bookings = await response.json()
    this.state = { fetched: true }
    this.setState(state => this) 
  }

  render() {
    if(!this.bookings){
    return <div>loading...</div>
  }
    return ( 
      <div>Helloooo</div>
    )
  }
}
 
export default Toplist;