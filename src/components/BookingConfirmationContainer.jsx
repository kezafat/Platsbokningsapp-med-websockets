import React, { Component } from "react";
import BookingConfirmation from "./BookingConfirmation";
import { Spinner } from 'reactstrap';

class BookingConfirmationContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchedBooking = false;
    this.selectedBooking = [];
    console.log('he');

  }

  async getSelectedBooking() {
    let { ticketID } = this.props.match.params;
    let booking = await fetch(`http://localhost:3000/json/bookings/${ticketID}`);
    this.bookingConfirmation = new BookingConfirmation(booking);
    this.fetchedBooking = true;
    this.setState(state => this);
    console.log(booking, this);
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
      <div className="booking-confirmation-container">
        {this.props.fetchedBooking ? this.props.bookingConfirmation : <Spinner />}
      </div>
    );
  }
}

//for route use shortHash

export default BookingConfirmationContainer;
