import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  Alert
} from 'reactstrap'
import TicketSelector from './TicketSelector'
import SeatMap from './SeatMap'
import Socket from './Socket'
import { withRouter } from 'react-router-dom'

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
    this.listenToSocketIo()
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
    return totalSeats - (this.state ? this.flatSeats.filter(seat => seat.booked).length : this.bookedSeats.length)
  }

  get ticketsCount() {
    let count = 0;
    for (let type in this.state.tickets) {
      count += this.state.tickets[type]
    }
    return count
  }

  get flatSeats() {
    // getter for all seats in one array, padded with an apache kitten at index 0
    // so all seats have the same index as the seat number
    return ['kitten'].concat(this.state.seats.flat())
  }

  get selectedSeats() {
    return this.flatSeats.filter(seat => seat.selected)
  }

  get highlightedSeats() {
    return this.flatSeats.filter(seat => seat.highlighted || seat.invalid)
  }

  componentDidMount() {
    this.suggestBestSeats()
  }

  componentWillUnmount() {
    this.unListenToSocketIo()
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
    if (this.ticketsCount < Math.min(this.freeSeatsCount, 8)) {
      const ticketType = event.target.parentNode.classList[1]
      this.setState(prevState => {
        // prevState should not be mutated
        const tickets = {...prevState.tickets}
        tickets[ticketType]++
        return { tickets: tickets }
      }, this.adjustSelection)
    }
  }

  subtractTicket = (event) => {
    const ticketType = event.target.parentNode.classList[1]
    if (this.state.tickets[ticketType] > 0) {
      this.setState(prevState => {
        const tickets = {...prevState.tickets}
        tickets[ticketType]--
        return { tickets: tickets }
      }, this.adjustSelection)
    }
  }

  adjustSelection = () => {
    const deficit = this.selectedSeats.length - this.ticketsCount
    if (deficit > 0) {
      this.mutateSeats(this.selectedSeats.slice(0, deficit), { selected: false })
    } else if (deficit < 0) {
      this.suggestBestSeats()
    }
  }

  toggleSeparateSeats = (event) => {
    this.separateSeats = event.target.checked
    if (!this.separateSeats) {
      this.suggestBestSeats()
    }
  }

  handleMouseOver = (event) => {
    let seatNumber = event.target.classList[2]
    this.indicateSelection(seatNumber)    
  }

  indicateSelection = (seatNumber) => {
    const row = this.flatSeats[seatNumber].row
    let lowSeatNumber = seatNumber, highSeatNumber = seatNumber
    const selection = []
    // do while loop so we always get one seat if separateseats, and one or more if not
    do {
      if (this.flatSeats[lowSeatNumber].row && this.flatSeats[lowSeatNumber].row === row) {
        selection.push(this.flatSeats[lowSeatNumber--]) 
      } else {
        selection.push(this.flatSeats[++highSeatNumber])
      }
    } while (!this.separateSeats && selection.length < this.ticketsCount)
    if (this.validateSelection(selection)) {
      this.mutateSeats(selection, { highlighted: true })
    } else {
      this.mutateSeats(selection, { invalid: true })
    }
  }

  mutateSeats = (selection, options) => {
    // this is how we mutate the seats array
    // i made it return a promise and put the promise resolver in the callback so we can await this
    // to make sure the new state has been applied before we move on
    return new Promise(resolve => {
      this.setState(prevState => {
        // prevState should not be mutated so clone
        const seats = JSON.parse(JSON.stringify(prevState.seats))
        // filter out seats that don't exist before looping
        for (let seat of selection.filter(seat => seat.row)) {
          // find the correct seat and apply new options
          seats[seat.row - 1][seat.index] = { ...seat, ...options }
        }
        return { seats: seats }
      }, resolve)
    })
  }

  handleMouseLeave = () => {
    this.removeSeatHighlight()
  }

  removeSeatHighlight = () => {
    this.mutateSeats(this.highlightedSeats, { highlighted: false, invalid: false })
  }

  removeSeatSelection = () => {
    this.mutateSeats(this.selectedSeats, { selected: false })
  }

  handleClick = (event) => {
    if (this.separateSeats) { return this.addOrRemoveSeparateSeat(event)}
    else if (this.validateSelection(this.highlightedSeats)) {
      this.removeSeatSelection()
      this.mutateSeats(this.highlightedSeats, { highlighted: false, selected: true })
    } //otherwise do nothing
  }

  addOrRemoveSeparateSeat = (event) => {
    // this one is based on the click event rather than the highlighted seats so it can support repeated selection and deselection of the same seat
    const seatNumber = event.target.classList[2]
    const newSeat = this.flatSeats[seatNumber]
    if (this.validateSelection([newSeat])) {
      if (this.selectedSeats.length < this.ticketsCount) {
        this.mutateSeats([newSeat], { highlighted: false, selected: true })
      } else {
        this.mutateSeats([this.selectedSeats[0]], { selected: false })
        this.mutateSeats([newSeat], { highlighted: false, selected: true })
      }
    } else if (this.selectedSeats.some(seat => seat.seatNumber === newSeat.seatNumber)){
      // if the set was selected, deslect it
      this.mutateSeats([newSeat], { selected: false, invalid: false })
    }
  }

  validateSelection(seats) {
    if (!seats[0] || (!this.separateSeats && seats.length !== this.ticketsCount)) { return false}
    const row = seats[0].row
    for (let seat of seats) {
      if (!seat || seat.row !== row || seat.booked || (this.separateSeats && seat.selected)) {
        return false
      }
    }
    return true
  }

  suggestBestSeats = () => {
    this.removeSeatSelection()
    const selection = (!this.separateSeats && this.findBestAdjacentSeats()) || this.findBestOverallSeats()
    this.mutateSeats(selection, { selected: true })
  }

  findBestAdjacentSeats = () => {
    let bestSelection = []
    let bestEvaluation = 0
    for (let row of this.state.seats) {
      for (let i = 0; i <= row.length - this.ticketsCount; i++) {
        const selection = row.slice(i, i + this.ticketsCount)
        if (this.validateSelection(selection)) {
          const evaluation = this.evaluateSelection(selection)
          if (evaluation > bestEvaluation) {
            bestEvaluation = evaluation
            bestSelection = selection
          }
        }
      }
    }
    return bestEvaluation > 0 ? bestSelection : false
  }

  findBestOverallSeats() {
    const sortedSeats = this.flatSeats.filter(seat => seat.evaluation && !seat.booked).sort((a, b) => b.evaluation - a.evaluation)
    return sortedSeats.slice(0, this.ticketsCount)    
  }

  evaluateSelection(selection) {
    return selection.reduce((accumulator, seat) => { return accumulator + seat.evaluation }, 0)
  }

  sendBookingRequest = async () => {
    const booking = {
      show: this.props.show._id,
      seats: this.selectedSeats.map(seat => seat.seatNumber),
      tickets: this.state.tickets
    }
    // remove the socket io listener so we don't get a conflict with our own booking
    this.unListenToSocketIo()
    const response = await fetch('http://localhost:3000/json/bookings', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
    const result = await response.json()
    if (result.ticketID) {
      // sucessful bonking (make this link go the right place when we know what that is)
      this.props.history.push('/bokningsbekräftelse/' + result.ticketID)
    } else {
      // not successful, listen to socket once again and let the user know
      this.listenToSocketIo()
      this.showAlert('booking-error')
    }
  }

  hideAlert(event) {
    event.currentTarget.parentNode.classList.add('d-none');
  }

  showAlert(className) {
    document.getElementsByClassName(className)[0].classList.remove('d-none')
  }

  listenToSocketIo() {
    Socket.on('newBooking' + this.props.show._id, this.addBooking)
  }

  unListenToSocketIo() {
    Socket.off('newBooking' + this.props.show._id, this.addBooking)
  }

  addBooking = async (booking) => {
    const bookedSeats = this.flatSeats.filter(seat => booking.seats.includes(seat.seatNumber))
    await this.mutateSeats(bookedSeats, { booked: true })
    if (this.selectedSeats.some(seat => booking.seats.includes(seat.seatNumber))) {
      this.handleConflictGracefully()
    }
  }

  handleConflictGracefully() {
    document.getElementsByClassName('seats-stolen-alert')[0].classList.remove('d-none')
    this.limitTicketsCount()
    this.suggestBestSeats()
  }

  limitTicketsCount = () => {
    const surplus = this.ticketsCount - this.freeSeatsCount
    const tickets = {...this.state.tickets}
    let removed = 0
    while (removed < surplus) {
      for (let type in tickets) {
        while (removed < surplus && tickets[type] > 0) {
          tickets[type]--
          removed++
        }
      }
    }
    this.setState({ tickets: tickets })
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
              <Col xs="12" className="d-flex justify-content-center">
                <input type="checkbox" name="Separate" id="separate-seats" className="m-2"onChange={this.toggleSeparateSeats}/>
                <label htmlFor="separate-seats">Separata platser</label>
              </Col>
              <Col xs="12" className="screen-container">
                <div className="screen">Bioduk</div>
              </Col>
            </Row>
            <Alert color="danger" className="d-none seats-stolen-alert" toggle={this.hideAlert}>
              Minst en av de platser du hade valt har precis blivit bokade av en annan användare
            </Alert>
            <SeatMap seats={this.state.seats} handleMouseOver={this.handleMouseOver} handleMouseLeave={this.handleMouseLeave} handleClick={this.handleClick} />
            {
              this.selectedSeats.length !== this.ticketsCount 
              ?
              <Alert color="danger" className="invalid-tickets-count">
                De platser du valt stämmer inte överens med antalet biljetter
              </Alert>
              :
              ''
            }
            <Alert color="danger" className="booking-error d-none" toggle={this.hideAlert}>
              Något gick fel med din bokning. Försök igen!
            </Alert>
            <Alert color="danger" className="d-none">
              Du måste vara inloggad för att kunna boka
            </Alert>
            <div className="button-wrap">
              <button className="btn btn-outline-danger" onClick={this.sendBookingRequest}>BOOK THAT SHOWY-SHOW</button>
            </div>
          </section>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(SeatSelector)