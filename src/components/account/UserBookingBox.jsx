import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';

class UserBookingBox extends Component {

  render() {
    const b = this.props.booking;

    const ticketBadge = (ticketCount) => (
      ticketCount <= 0 ?
        <Badge pill className="float-right">{ticketCount}</Badge> :
        <Badge pill className="float-right" color="danger">{ticketCount}</Badge>
    )

    const ticketDetails = () => (
      <Col md="6">
        <ListGroup className="text-dark">
          <ListGroupItem className="justify-content-between">Datum & Tid <span className="float-right font-weight-bold">{b.show.date} kl {b.show.time}</span></ListGroupItem>
          <ListGroupItem className="justify-content-between">Alkohol tillåtet <span className="float-right font-weight-bold">{b.show.auditorium.alcohol}</span></ListGroupItem>
          <ListGroupItem className="justify-content-between">Barn {ticketBadge(b.tickets.kids)}</ListGroupItem>
          <ListGroupItem className="justify-content-between">Vuxna {ticketBadge(b.tickets.adult)}</ListGroupItem>
          <ListGroupItem className="justify-content-between">Pensionärer {ticketBadge(b.tickets.senior)}</ListGroupItem>
          <ListGroupItem className="justify-content-between">Platser <span className="float-right">{b.seats.join(', ')}</span></ListGroupItem>
          <ListGroupItem className="justify-content-between">Biljettkod <span className="float-right">{b.ticketID}</span></ListGroupItem>
        </ListGroup>
      </Col>
    )

    const movieDetails = () => (
      <Col md="6">
        <h3>{b.show.movie.title}</h3>
        <p>Ange biljettnummer {b.ticketID} i {b.show.auditorium.name}</p>
        <div>{b.show.movie.description}</div>
      </Col>
    )

    return (
      <div className="bookingGroup bg-dark text-light">
        <Row>
          {ticketDetails()}
          {movieDetails()}
        </Row>
      </div >
    );
  }
}

export default UserBookingBox;