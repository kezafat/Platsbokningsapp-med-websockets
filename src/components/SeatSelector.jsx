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

class SeatSelector extends Component {
  constructor(props) {
    super(props)
    const seats = this.generateSeats()
    this.state = {
      seats: seats,
      tickets: {
        adult: this.freeSeatsCount < 2 ? this.freeSeatsCount : 2,
        senior: 0,
        kids: 0
      }
    }
    this.separateSeats = false;
  }

  get bookedSeats() {
    const bookedSeats = [];
    for (let booking of this.props.show.bookings) {
      bookedSeats.push(...booking.seats);
    }
    return bookedSeats
  }

  get freeSeatsCount() {
    const totalSeats = this.props.show.auditorium.seats.reduce((accumulator, current) => accumulator + current, 0)
    return totalSeats - this.bookedSeats
  }

  get ticketsCount() {
    let count = 0;
    for (let type in this.state.tickets) {
      count += this.state.tickets[type]
    }
    return count
  }

  get flatSeats() {
    // getter for all seats in one array, padded with a kitten at index 0
    // so all seats have the same index as the seat number
    return ['kitten'].concat(this.state.seats.flat())
  }

  generateSeats = () => {
    // clone so we dont invoke the getter every time
    const bookedSeats = [...this.bookedSeats]
    let seatCounter = 0;
    const seats = this.props.show.auditorium.seats.map((numberOfSeatsInRow, index, originalSeats) => {
      const seats = []
      for (let i = 0; i < numberOfSeatsInRow; i++) {
        const evaluation = this.evaluateSeat(i + 1, numberOfSeatsInRow, index + 1, originalSeats.length)
        seats.push({
          seatNumber: ++seatCounter,
          row: index + 1,
          evaluation: evaluation,
          index: i,
          booked: bookedSeats.includes(seatCounter)
        })
      }
      return seats
    })
    return seats
  }

  evaluateSeat(seatPositionInRow, seatsInRow, row, totalRows) {
    // evaluate seats based on distance from center
    let evaluation = 100;
    evaluation -= Math.abs(((seatsInRow + 1) / 2) - seatPositionInRow)
    evaluation -= Math.abs(((totalRows + 1) / 2) - row)
    return evaluation
  }

  addTicket = (event) => {
    if (this.ticketsCount < 8) {
      const ticketType = event.target.parentNode.classList[1]
      this.setState(prevState => {
        // prevState should not be mutated
        const tickets = {...prevState.tickets}
        tickets[ticketType]++
        return { tickets: tickets }
      })
    }
  }

  subtractTicket = (event) => {
    const ticketType = event.target.parentNode.classList[1]
    if (this.state.tickets[ticketType] > 0) {
      this.setState(prevState => {
        const tickets = {...prevState.tickets}
        tickets[ticketType]--
        return { tickets: tickets }
      })
    }
  }

  handleMouseOver = (event) => {
    let seatNumber = event.target.classList[2]
    const selection = []
    // do while loop so we always get one seat if separateseats, and one or more if not
    do {
      selection.push(this.flatSeats[seatNumber--])
    } while (!this.separateSeats && selection.length < this.ticketsCount)
    if (this.validateSelection(selection)) {
      this.mutateSeats(selection, { highlighted: true })
    } else {
      this.mutateSeats(selection, { invalid: true })
    }
  }

  mutateSeats = (selection, options) => {
    // this is how we mutate the seats array
    this.setState(prevState => {
      // prevState should not be mutated so clone
      const seats = [...prevState.seats]
      // filter out seats that don't exist before looping
      for (let seat of selection.filter(seat => seat.row)) {
        // find the correct seat and apply new options
        seats[seat.row - 1][seat.index] = { ...seat, ...options }
      }
      return { seats: seats }
    })
  }

  handleMouseLeave = () => {
    this.removeSeatHighlight()
  }

  removeSeatHighlight = () => {
    this.setState(prevState => {
      const seats = [...prevState.seats]
      for (let seat of prevState.seats.flat().filter(seat => seat.highlighted || seat.invalid)) {
        seats[seat.row - 1][seat.index] = { ...seat, highlighted: false, invalid: false }
      }
      return { seats: seats }
    })
  }

  removeSeatSelection = () => {
    const selectedSeats = this.flatSeats.filter(seat => seat.selected)
    this.mutateSeats(selectedSeats, { selected: false })
  }

  handleClick = () => {
    const selectedSeats = this.flatSeats.filter(seat => seat.highlighted)
    if (this.validateSelection(selectedSeats)) {
      this.removeSeatSelection()
      this.mutateSeats(selectedSeats, { highlighted: false, selected: true })
    }
  }

  validateSelection(seats) {
    if (!seats[0]) { return false}
    const row = seats[0].row
    for (let seat of seats) {
      if (!seat || seat.row !== row || seat.booked) {
        return false
      }
    }
    return true
  }









  // ---------------------------------------------

  // ---------------- RENDER ---------------------

  // ---------------------------------------------

  render() {
    return (
      <Card className="my-3">
        <CardBody>
          <TicketSelector addTicket={this.addTicket} subtractTicket={this.subtractTicket} tickets={this.state.tickets} />
          <section className="seat-selector">
            <Row>
              <Col xs="12" sm="">
                <input type="checkbox" name="Separate" id="separate-seats" onChange={() => this.separateSeats = !this.separateSeats}/>
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