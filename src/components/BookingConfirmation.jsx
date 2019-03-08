import React, { Component } from "react";

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
        <Row>
          <Col>
            <Row>
              <Col>
                <h2>Sammanställning</h2>
                <h4 className="pb-3">Bokningsnummer:</h4>
                <Card>
                  <CardBody className="rounded-lg">
                    <Row>
                      <Col md="auto">
                        <CardImg src="../images/ + " />
                      </Col>
                      <Col md="auto">
                        <h5 className="cardTitle text-center-md" />
                        <h6 className="cardSubtitle mb-1 mt-1 text-center-md" />
                        <p className="cardText text-center-md" />
                        <p className="cardText text-center-md">Platser: </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <h5 className="cardText pb-3 pt-4">
                  Vuxen: <div className="float-right">kr</div>
                </h5>
                <h5 className="cardText pb-3 pt-4">
                  Pensionär: <div className="float-right">kr</div>
                </h5>
                <h5 className="cardText pb-3 pt-4">
                  Barn: <div className="float-right">kr</div>
                </h5>
                <hr />
                <h5 className="cardText pb-3 pt-4">
                  Totalt: <div className="float-right">kr</div>
                </h5>
                <Link
                  to={
                    "/bokning/" +
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
                  Boka
                </Link>
                <Link
                  to={
                    "/filmer/" +
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
                  INFO
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

export default BookingConfirmation;
