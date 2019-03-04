import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap'
import TicketSelector from './TicketSelector'
import SeatMap from './SeatMap'
import Seat from './Seat'

class SeatSelector extends Component {
  constructor(props) {
    super(props)
    const seats = this.generateSeats()
    this.state = { seats: seats }
  }

  get bookedSeats() {
    const bookedSeats = [];
    for (let booking of this.props.show.bookings) {
      bookedSeats.push(...booking.seats);
    }
    return bookedSeats
  }

  generateSeats = () => {
    let seatCounter = 0;
    const seats = this.props.show.auditorium.seats.map((numberOfSeatsInRow, index, originalSeats) => {
      const seats = []
      for (let i = 0; i < numberOfSeatsInRow; i++) {
        const evaluation = this.evaluateSeat(i + 1, numberOfSeatsInRow, index + 1, originalSeats.length)
        seats.unshift(<Seat seatNumber={++seatCounter} row={index + 1} key={seatCounter} evaluation={evaluation} />)
      }
      for (let seat of seats) {
        console.log(seat.props)
      }
      return seats
    })
    return seats
  }

  evaluateSeat(seatPositionInRow, seatsInRow, row, totalRows) {
    let evaluation = 100;
    evaluation -= Math.abs((seatsInRow + 1)/2 - seatPositionInRow)
    evaluation -= Math.abs((totalRows + 1)/2 - row)
    return evaluation
  }

  addTicket() {
    console.log('ticket added')
  }

  subtractTicket() {
    console.log('ticket subraxxed')
  }

  handleMouseOver = () => {

  }

  handleMouseLeave = () => {

  }

  handleClick = () => {

  }

  render() {
    return (
      <Card className="my-3">
        <CardBody>
          <TicketSelector addTicket={this.addTicket} subtractTicket={this.subtractTicket} />
          <section className="seat-selector">
            <Row>
              <Col xs="12" sm="">
                <input type="checkbox" name="Separate" id="separate-seats"/>
                <label htmlFor="separate-seats">Separata platser</label>
              </Col>
              <Col xs="12" sm="" className="screen-container">
                <div className="screen">Bioduk</div>
              </Col>
              <Col sm="" />
            </Row>
            <UncontrolledAlert color="danger" className="d-none">              
              Minst en av de platser du hade valt har precis blivit bokade av en annan användare    
            </UncontrolledAlert>
            <SeatMap seats={this.state.seats} handleMouseOver={this.handleMouseOver} handleMouseLeave={this.handleMouseLeave} handleClick={this.handleClick} />
            <UncontrolledAlert color="danger" className="d-none">
              De platser du valt stämmer inte överens med antalet biljetter
            </UncontrolledAlert>
            <UncontrolledAlert color="danger" className="d-none">
              Något gick fel med din bokning. Försök igen!
            </UncontrolledAlert>
            <UncontrolledAlert color="danger" className="d-none">
              Du måste vara inloggad för att kunna boka
            </UncontrolledAlert>
            <div className="button-wrap">
              <button className="btn btn-outline-danger">BOOK THAT SHOWY-SHOW</button>
            </div>
          </section>
        </CardBody>
      </Card>
    )
  }
}

export default SeatSelector