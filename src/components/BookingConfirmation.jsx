import React, { Component } from "react";
import Booking from "./Booking";
import { Row, Col, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

class BookingConfirmation extends Component {
  constructor(booking) {
    super();
    this.selectedBooking = booking;
  }
  get ticketPrice() {
    return (
      
      this.selectedBooking.tickets.adult * 85 +
      this.selectedBooking.tickets.senior * 75 +
      this.selectedBooking.tickets.kids * 65
    );
  }
  get adultPrice() {
    return this.selectedBooking.tickets.adult * 85;
  }
  get seniorPrice() {
    return this.selectedBooking.tickets.senior * 75;
  }
  get kidsPrice() {
    return this.selectedBooking.tickets.kids * 65;
  }

  render() {
    return (
      <section>
        <Booking>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h2>Sammanställning</h2>
                  <h4 className="pb-3">
                    Bokningsnummer:{this.props.selectedBooking.ticketID}
                  </h4>
                  <Card>
                    <CardBody className="rounded-lg">
                      <Row>
                        <Col md="auto">
                          <CardImg src="../images/{this.selectedBooking.show.movie.images[0]} " />
                        </Col>
                        <Col md="auto">
                          <h5 className="cardTitle text-center-md">{this.props.selectedBooking.show.movie.title}</h5>
                          <h6 className="cardSubtitle mb-1 mt-1 text-center-md">{this.selectedBooking.show.auditorium.name}</h6>
                          <p className="cardText text-center-md"> {this.props.selectedBooking.show.time}</p>
                          <p className="cardText text-center-md">Platser:{this.props.selectedBooking.seats.join(',')}</p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <h5 className="cardText pb-3 pt-4">
                    Vuxen: <div className="float-right">{this.props.adultPrice}kr</div>
                  </h5>
                  <h5 className="cardText pb-3 pt-4">
                    Pensionär: <div className="float-right">{this.props.seniorPrice}kr</div>
                  </h5>
                  <h5 className="cardText pb-3 pt-4">
                    Barn: <div className="float-right">{this.props.kidsPrice}kr</div>
                  </h5>
                  <hr />
                  <h5 className="cardText pb-3 pt-4">
                    Totalt: <div className="float-right">{this.props.ticketPrice}kr</div>
                  </h5>
                  <Link
                    to={
                      "/visningar/" +
                      this.props.show.auditorium.name
                        .replace(" ", "-")
                        .toLowerCase() +
                      "/" +
                      this.props.show.date +
                      "/" +
                      this.props.show.time
                    }
                    className="btn btn-outline-danger mt-auto mb-3"
                  >
                    Tillbaka
                  </Link>
                  <Link
                    to={
                      "/mitt-konto/" +
                      this.props.show.auditorium.name
                        .replace(" ", "-")
                        .toLowerCase() +
                      "/" +
                      this.props.show.date +
                      "/" +
                      this.props.show.time
                    }
                    className="btn btn-outline-danger mt-auto mb-3 ml-4"
                  >
                    Mitt Konto
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Booking>
      </section>
    );
  }
}

export default BookingConfirmation;
