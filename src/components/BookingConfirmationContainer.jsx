import React, { Component } from "react";
import BookingConfirmation from "./BookingConfirmation";

class BookingConfirmationContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchedBooking = false;
  }

  async getSelectedBooking() {
    console.log('ko');
    // let urlParams = new URLSearchParams(window.location.search);
    // let id = urlParams.get("id");
    // if (id === null) {
    //   return
    // };
    
    let booking = await fetch("http://localhost:3000/json/shows/");
    this.bookingConfirmation = new BookingConfirmation(booking);
    this.setState(state => this);
    console.log(booking);
    console.log('hi');

  }
  componentDidMount() {
    this.getSelectedBooking();
  }
  componentWillUnmount() {
    this.fetchedBooking = false;
  }

  render() {
    return (
      <div class="booking-confirmation-container">
        $
        {this.fetchedBooking
          ? this.bookingConfirmation
          : `<div
    class="spin-container d-flex justify-content-center center-spinner">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`}
      </div>
    );
  }
}

//for route use shortHash

export default BookingConfirmationContainer;
