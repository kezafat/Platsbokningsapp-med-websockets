import React, { Component } from "react";
import { Spinner, Row, Col, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

class BookingConfirmation extends Component {
  constructor(props) {
    super(props);
    this.fetchedBooking = false;
    this.booking = {};
    this.movie = this.props.movie;
    this.auditorium = this.props.auditorium;
  }

  async getfetchedBooking() {
    const { ticketID } = this.props.match.params;
    let booking = await fetch(`http://localhost:3000/json/bookings/${ticketID}`);
    this.fetchedBooking = await booking.json();
    this.booking = this.fetchedBooking[0]
    this.bookingConfirmation = new BookingConfirmation(booking);
    this.setState(state => this);
  }

  async componentDidMount() {
    await this.getfetchedBooking();
  }
  componentWillUnmount() {
    this.fetchedBooking = false;
  }

  get ticketPrice() {
    return (this.fetchedBooking.tickets.adult * 85) + (this.fetchedBooking.tickets.senior * 75) + (this.fetchedBooking.tickets.kids * 65);
  }
  get adultPrice() {
    return (this.fetchedBooking.tickets.adult * 85)
  }
  get seniorPrice() {
    return (this.fetchedBooking.tickets.senior * 75)
  }
  get kidsPrice() {
    return (this.fetchedBooking.tickets.kids * 65)
  }


  render() {
    let booking = this.fetchedBooking;
    if (!this.fetchedBooking) {
      return <div className="d-flex justify-content-center">
        <Spinner color="secondary" />
      </div>
    }
    return (
      <section className="booking-confirmation">
        <Row>
          <Col>
            <Row className="my-3">
              <Col className="xl-7 lg-7 mx-auto background p-5">
                <h2>Samanställning</h2>
                <h4 className="pb-3">Bokningsnummer: {booking.ticketID} </h4>
                <Card>
                  <CardBody className="rounded-lg">
                    <Row>
                      <Col className="auto">
                        <CardImg src={require("../images/" + booking.show.movie.images[0])} />
                        <Col className="auto">
                          <h5 className="card-title-text-center-md">{booking.show.movie.title}</h5>
                          <h6 className="card-subtitle mb-1 mt-1 text-center-md">{booking.show.auditorium.name}</h6>
                          <p className="card-text text-center-md">{booking.show.time} - {booking.show.date}</p>
                          <p className="card-text text-center-md">Platser: {booking.seats.join(', ')}</p>
                        </Col>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <h5 className="card-text pb-3 pt-4">Vuxen: <div className="float-right">{this.adultPrice}kr</div></h5>
                <h5 className="card-text pb-3">Pensionär: <div className="float-right">{this.seniorPrice}kr</div></h5>
                <h5 className="card-text pb-4">Barn: <div className="float-right">{this.kidsPrice}kr</div></h5>
                <hr></hr>
                <h5 className="card-text pb-5 pt-3">Totalt: <div className="float-right">{this.ticketPrice}kr</div></h5>
                <Link to="/visningar" className="btn btn-outline-danger d-block mb-1" role="button">Tillbaka</Link>
                <Link to="/mitt-konto" className="btn btn-outline-danger d-block" role="button">Mitt Konto</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    )
  }
}

export default BookingConfirmation;
