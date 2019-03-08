import React, { Component } from "react";

class BookingConfirmationContainer extends Component {
  constructor() {
    super();
    this.fetchedBooking = false;
    state = {};
  }

  async getSelectedBooking() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    if (id === null) {
      return;
    }
    let booking = await fetch("http://localhost:3000/json/shows/");
    this.bookingConfirmation = new BookingConfirmation(booking);
    this.setState(state => this);
    console.log(booking);
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
