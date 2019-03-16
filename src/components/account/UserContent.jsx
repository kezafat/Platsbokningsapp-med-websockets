import React, { Component } from 'react';
import { Jumbotron, Spinner } from 'reactstrap';
import UserBookingBox from './UserBookingBox'
import FR from '../../fetchRouter.js';

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      bookings: {
        currentBookings: [],
        previousBookings: [],
        futureBookings: [],
      }
    }
  }

  async getUserBookings() {
    const fetchData = {
      endpoint: "/json/bookings/"
    }
    const res = await FR(fetchData, "GET");
    const userDbBookings = res.filter((entry) => {
      return entry.user === global.user._id;
    })

    let tmpUserObj = {
      currentBookings: [],
      previousBookings: [],
      futureBookings: [],
    }

    for (let booking of userDbBookings) {
      let todaysDate = new Date().toISOString().split('T')[0];
      if (!booking.show) {
        continue;
      }
      let bookingDate = booking.show.date;

      if (bookingDate === todaysDate) {
        // TODAYS BOOKINGS
        tmpUserObj.currentBookings.push(booking);
      } else if (bookingDate < todaysDate) {
        // OLD BOOKINGS
        tmpUserObj.previousBookings.push(booking);
      } else {
        // FUTURE BOOKINGS
        tmpUserObj.futureBookings.push(booking);
      }

    }

    this.setState({ loaded: true, bookings: tmpUserObj })
  }

  render() {


    const userBookingHistory = (title, bookings) => {
      // Sort dem bookings some time in the future

      return (
        <div>
          <h3 className="userBookingHistoryHeading text-dark text-center">{title} ({bookings.length} st)</h3>
          {bookings.map((book, index) => (
            <UserBookingBox key={index} booking={book} />
          ))}
        </div>
      )
    }

    const userBookingData = () => (
      <Jumbotron className="mt-2 mb-2 text-dark usercontent">
        {userBookingHistory('Aktuella bokningar', this.state.bookings.currentBookings)}
        {userBookingHistory('Framtida bokningar', this.state.bookings.futureBookings)}
        {userBookingHistory('Bokningshistorik', this.state.bookings.previousBookings)}
      </Jumbotron>
    )

    return (
      this.state.loaded ? userBookingData() : <Spinner />
    );
  }
  componentDidMount() {
    this.getUserBookings();
  }
}

export default UserContent;