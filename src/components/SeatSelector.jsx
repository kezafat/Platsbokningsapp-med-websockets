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
    this.state = {
      rows: this.generateRows(),
      tickets: this.generateTickets(),
      separateSeats: false
    }
    this.separateSeatsForced = false
    this.listenToSocketIo()
  }

  get allSeats() {
    // these seats getters will be heavily utilized throughout this component
    // this is the basic one, with all seats in one array
    return this.state.rows.flat()
  }

  get indexedSeats() {
    // getter for all seats in one array, padded with a kitten at index 0
    // so all seats have the same index as the seat number
    return ['kitten'].concat(this.allSeats)
  }

  get selectedSeats() {
    return this.allSeats.filter(seat => seat.selected)
  }

  get highlightedSeats() {
    // invalid is a highlight to indicate invalid selection
    return this.allSeats.filter(seat => seat.highlighted || seat.invalid || seat.deselect)
  }

  get bookedSeats() {
    return this.allSeats.filter(seat => seat.booked)
  }

  get freeSeats() {
    return this.allSeats.filter(seat => !seat.booked)
  }

  get totalSeats() {
    return this.props.show.auditorium.seats.reduce((accumulator, current) => accumulator + current, 0)
  }

  get freeAdjacentSeatsMax() {
    // counts the highest number of free adjacent seats
    let count = 0, maxCount = 0, row = 1
    for (let seat of this.allSeats) {
      if (seat.row === row && !seat.booked) {
        // if the seat is on our current row and not booked, count up and adjust max if reached
        maxCount = Math.max(++count, maxCount)
      } else {
        // if the seat isnt booked it means we entered a new row, so start counting at one
        // if it is booked it doesnt matter if its a new row or not, start count at 0
        count = seat.booked ? 0 : 1
        row = Math.max(row, seat.row)
      } 
    }
    return maxCount
  }

  get ticketsCount() {
    return Object.values(this.state.tickets).reduce((accumulator, current) => accumulator + current, 0)
  }

  componentDidMount() {
    this.suggestBestSeats()
  }

  componentWillUnmount() {
    this.unListenToSocketIo()
  }

  generateRows() {
    // this method is used in the constructor to create the seats state
    // we don't have access to state yet so get bookings from props
    const bookedSeats = this.props.show.bookings.map(booking => booking.seats).flat()
    let seatCounter = 0;
    const seatsInBiggestRow = Math.max(...this.props.show.auditorium.seats)
    // create an array with the rows, containing arrays with information about each seat
    const rows = this.props.show.auditorium.seats.map((numberOfSeatsInRow, rowIndex, originalSeats) => {
      const seats = []
      for (let i = 0; i < numberOfSeatsInRow; i++) {
        const evaluation = this.evaluateSeat(i + 1, numberOfSeatsInRow, rowIndex + 1, originalSeats.length)
        seats.push({
          seatNumber: ++seatCounter,
          row: rowIndex + 1,
          evaluation: evaluation,
          index: i,
          offsetIndex: i + ((seatsInBiggestRow - numberOfSeatsInRow )/ 2),
          booked: bookedSeats.includes(seatCounter)
        })
      }
      return seats
    })
    return rows
  }

  generateTickets() {
    const bookedSeats = this.props.show.bookings.map(booking => booking.seats).flat()
    const tickets = {
      adult: Math.min(2, this.totalSeats - bookedSeats.length),
      senior: 0,
      kids: 0
    }
    return tickets
  }

  evaluateSeat(seatPositionInRow, seatsInRow, row, totalRows) {
    // evaluate seats based on distance from center
    let evaluation = 100;
    evaluation -= Math.abs(((seatsInRow + 1) / 2) - seatPositionInRow)
    evaluation -= Math.abs(((totalRows + 1) / 2) - row)
    return evaluation
  }

  addTicket = (event) => {
    // do not allow more than 8 tickets, or more tickets than the amount of free seats
    if (this.ticketsCount < Math.min(this.freeSeats.length, 8)) {
      const ticketType = event.target.parentNode.classList[1]
      // update state and supply this.adjustSelection as callback once state update is complete
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

  adjustSelection() {
    if (this.selectedSeats.length === 0) { return this.suggestBestSeats() }
    const surplus = this.selectedSeats.length - this.ticketsCount
    if (surplus > 0) {
      this.unselectedRecentSeats(surplus)
    } else if (surplus === -1 && !this.state.separateSeats) {
      this.addOneAdjacentSeatToSelection()
    } else if (surplus < 0 && this.state.separateSeats) {
      this.addClosestSeatsToSelection(Math.abs(surplus))
    } else if (surplus < -1) {
      this.suggestBestSeats()
    }
  }

  async unselectedRecentSeats(numberOfSeats) {
    const selection = this.selectedSeats.sort((a, b) => b.order - a.order).slice(0, numberOfSeats)
    await this.mutateSeats(selection, { selected: false })
    if (this.separateSeatsForced && this.selectedSeats.every(seat => seat.row === this.selectedSeats[0].row)) {
      this.setState({ separateSeats: false })
      this.separateSeatsForced = false
    }
  }

  async addOneAdjacentSeatToSelection() {
    // first try to expand the selection to a higher or lower seat based on evaluation
    const row = this.selectedSeats[0].row
    // if lowerSeat goes out of range(index 0), it will reach the kitten string and all is fine
    const lowerSeat = this.indexedSeats[this.selectedSeats[0].seatNumber - 1]
    // if higherseat goes out of range, we force it to become a dummy object with booked = true so the below logic still works fine
    const higherSeat = this.indexedSeats[this.selectedSeats[this.selectedSeats.length - 1].seatNumber + 1] || { booked: true }
    if (!lowerSeat.booked && lowerSeat.row === row && (lowerSeat.evaluation >= higherSeat.evaluation || higherSeat.booked)) {
      await this.mutateSeats([lowerSeat], { selected: true })
    } else if (!higherSeat.booked && higherSeat.row === row) {
      await this.mutateSeats([higherSeat], { selected: true })
    } else if (this.freeAdjacentSeatsMax >= this.ticketsCount) {
      // if that doesnt work, but there are enough free adjacent seats, suggest them
      this.suggestBestSeats()
    } else {
      // otherwise, force separate seats
      this.addClosestSeatsToSelection(1)
      this.setState({ separateSeats: true })
      this.separateSeatsForced = true
    }
  }

  addClosestSeatsToSelection(numberOfSeats) {
    const row = this.selectedSeats.sort((a, b) => b.order - a.order)[0].row
    const selectedSeatsOnRow = this.selectedSeats.filter(seat => seat.row === row)
    // take the index from one of the middle seats
    const index = selectedSeatsOnRow[Math.floor(selectedSeatsOnRow.length / 2)].offsetIndex
    // compare index and row with available free seats and select the closest one (prioritizing same row)
    const closestSeats = this.freeSeats.filter(seat => !seat.selected).sort((a, b) => (Math.abs(a.offsetIndex - index) / 3 + Math.abs(a.row - row)) - (Math.abs(b.offsetIndex - index) / 3 + Math.abs(b.row - row))).slice(0, numberOfSeats)
    this.mutateSeats(closestSeats, { selected: true })
  }

  toggleSeparateSeats = (event) => {
    this.setState({ separateSeats: event.target.checked }, () => {
      if (!this.state.separateSeats && !this.validateSelection(this.selectedSeats)) {
        this.suggestBestSeats()
      }
    })
  }

  handleMouseOver = (event) => {
    const seatNumber = event.target.classList[2]
    this.indicateSelection(seatNumber)    
  }

  indicateSelection(seatNumber) {
    const row = this.indexedSeats[seatNumber].row
    let lowSeatNumber = seatNumber, highSeatNumber = seatNumber
    const selection = []
    // do while loop so we always get one seat if separateseats, and one or more if not
    do {
      // expand to lower seat numbers if on same row, otherwise expand to highter
      if (lowSeatNumber && this.indexedSeats[lowSeatNumber].row === row) {
        selection.push(this.indexedSeats[lowSeatNumber--]) 
      } else {
        selection.push(this.indexedSeats[++highSeatNumber])
      }
    } while (!this.state.separateSeats && selection.length < this.ticketsCount)
    
    if (this.validateSelection(selection)) {
      this.mutateSeats(selection, { highlighted: true })
    } else if (this.state.separateSeats && this.selectedSeats.includes(selection[0])) {
      this.mutateSeats(selection, { deselect: true })
    } else {
      this.mutateSeats(selection, { invalid: true })
    }
  }

  //counter for selected seats
  selectedSeatsCounter = 0

  mutateSeats(selection, options) {
    // this is how we mutate the rows array
    // i made it return a promise and put the promise resolver in the callback so we can await this
    // to make sure the new state has been applied before we move on
    return new Promise(resolve => {
      this.setState(prevState => {
        // prevState should not be mutated so clone
        const rows = JSON.parse(JSON.stringify(prevState.rows))
        // filter out seats that don't exist before looping
        for (let seat of selection.filter(seat => seat.row)) {
          // first we increment the counter and add the count to the seat, if it is to be selected 
          if (options.selected) { options.order = ++this.selectedSeatsCounter }
          // find the correct seat and apply new options
          rows[seat.row - 1][seat.index] = { ...seat, ...options }
        }
        return { rows: rows }
      }, resolve)
    })
  }

  handleMouseLeave = () => {
    this.removeSeatHighlight()
  }

  removeSeatHighlight() {
    this.mutateSeats(this.highlightedSeats, { highlighted: false, invalid: false, deselect: false })
  }

  removeSeatSelection() {
    this.mutateSeats(this.selectedSeats, { selected: false })
  }

  handleClick = (event) => {
    if (this.state.separateSeats) { return this.addOrRemoveSeparateSeat(event)}
    else if (this.validateSelection(this.highlightedSeats)) {
      this.removeSeatSelection()
      this.mutateSeats(this.highlightedSeats, { highlighted: false, selected: true })
    } //otherwise do nothing
  }

  addOrRemoveSeparateSeat(event) {
    // this one is based on the click event rather than the highlighted seats so it can support repeated selection and deselection of the same seat
    const seatNumber = event.target.classList[2]
    const newSeat = this.indexedSeats[seatNumber]
    // if the user starts adding/removing seats, we assume that they want to stay in separate seats mode
    this.separateSeatsForced = false
    if (this.validateSelection([newSeat])) {
      if (this.selectedSeats.length < this.ticketsCount) {
        this.mutateSeats([newSeat], { highlighted: false, selected: true })
      } else {
        this.unselectedRecentSeats(1)
        this.mutateSeats([newSeat], { highlighted: false, selected: true })
      }
    } else if (this.selectedSeats.some(seat => seat.seatNumber === newSeat.seatNumber)){
      // if the set was selected, deselect that motherfucker
      this.mutateSeats([newSeat], { selected: false, invalid: false })
    }
  }

  validateSelection(seats) {
    if (!seats[0] || (!this.state.separateSeats && seats.length !== this.ticketsCount) || this.ticketsCount === 0) { return false }
    const row = seats[0].row
    for (let seat of seats) {
      if (!seat || seat.row !== row || seat.booked || (this.state.separateSeats && seat.selected)) {
        return false
      }
    }
    return true
  }

  suggestBestSeats() {
    this.removeSeatSelection()
    const selection = this.findBestAdjacentSeats() || this.findBestOverallSeats()
    this.mutateSeats(selection, { selected: true })
  }

  findBestAdjacentSeats() {
    // if we are in separate seats mode, return false and immediately jump to finding best overall seats
    if (this.state.separateSeats) { return false }
    let bestSelection = []
    let bestEvaluation = 0
    // loop through all possible selections of n amount of tickets
    for (let row of this.state.rows) {
      for (let i = 0; i <= row.length - this.ticketsCount; i++) {
        const selection = row.slice(i, i + this.ticketsCount)
        if (this.validateSelection(selection)) {
          // if the selection passes the validation, check if it has the highest evaluation and update best selection if so
          const evaluation = this.evaluateSelection(selection)
          if (evaluation > bestEvaluation) {
            bestEvaluation = evaluation
            bestSelection = selection
          }
        }
      }
    }
    // if we didn't find a valid selection, the best evaluation is still 0, so return false so it jumps to finding best overall seats
    return bestEvaluation > 0 ? bestSelection : false
  }

  findBestOverallSeats() {
    if (!this.state.separateSeats) {
      // if we end up here despite separate seats being off, we must force separate seats
      this.setState({ separateSeats: true })
      this.separateSeatsForced = true
    }
    // sort the seats by evaluation, the select as many as we want
    const sortedSeats = this.freeSeats.sort((a, b) => b.evaluation - a.evaluation)
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
      // we have access to history as a prop because we wrap this component in the withRouter function
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
    // find the freshly booked seats based on their numbers and set them to booked
    const freshlyBookedSeats = this.allSeats.filter(seat => booking.seats.includes(seat.seatNumber))
    await this.mutateSeats(freshlyBookedSeats, { booked: true })
    // if the user had selected one of the freshly booked seats, handle the conflict gracefully
    // (he who treads softly goes far)
    if (this.selectedSeats.some(seat => booking.seats.includes(seat.seatNumber))) {
      this.handleConflictGracefully()
    }
  }

  handleConflictGracefully() {
    document.getElementsByClassName('seats-stolen-alert')[0].classList.remove('d-none')
    this.limitTicketsCount()
    this.suggestBestSeats()
  }

  limitTicketsCount() {
    const surplus = this.ticketsCount - this.freeSeats.length
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

  // Congratulations, you made it to the end!

  // ---------------------------------------------

  // ---------------- RENDER ---------------------

  // ---------------------------------------------

  render() {
    return (
      <Card className="my-3">
        <CardBody>
          <TicketSelector addTicket={this.addTicket} subtractTicket={this.subtractTicket} tickets={this.state.tickets} freeSeatsCount={this.freeSeats.length} />
          <section className="seat-selector">
            <Row>
              <Col xs="12" className="d-flex justify-content-center">
                <input type="checkbox" name="Separate" id="separate-seats" className="m-2" onChange={this.toggleSeparateSeats}
                checked={this.state.separateSeats} disabled={this.ticketsCount > this.freeAdjacentSeatsMax ? true : false}/>
                <label htmlFor="separate-seats">Separata platser</label>
              </Col>
              <Col xs="12" className="screen-container">
                <div className="screen">Bioduk</div>
              </Col>
            </Row>
            <Alert color="danger" className="d-none seats-stolen-alert" toggle={this.hideAlert}>
              Minst en av de platser du hade valt har precis blivit bokade av en annan användare
            </Alert>
            <SeatMap rows={this.state.rows} handleMouseOver={this.handleMouseOver} handleMouseLeave={this.handleMouseLeave} handleClick={this.handleClick} />
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
            {
              (this.freeSeats.length > 0)
              ?
              <button className="btn btn-outline-danger" disabled={this.selectedSeats.length !== this.ticketsCount} onClick={this.sendBookingRequest}>BOOK THAT SHOWY-SHOW</button>
              :
              <button className="btn btn-outline-danger disabled">Denna visning är fullbokad</button>
            }
            </div>
          </section>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(SeatSelector)