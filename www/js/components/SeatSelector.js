class SeatSelector extends Component {
  constructor(show) {
    super();
    this.show = show;
    this.addEvents({
      'click .minus': 'subtractTicket',
      'click .plus': 'addTicket',
      'mouseoverSeat': 'highlightSeatSelection',
      'mouseleaveSeat': 'removeSeatHighlight',
      'click span.seat': 'selectSeats',
      'click #book-tickets': 'sendBookingRequest'
    });
    this.tickets = {
      adult: 2,
      senior: 0,
      kids: 0
    }
    this.seatMap = new SeatMap(this.show.auditorium.seats, this.bookedSeats);
    this.highlightedSeats = [];
    this.selectedSeats = [];
  }

  get ticketsCount() {
    return this.tickets.adult + this.tickets.senior + this.tickets.kids
  }

  get bookedSeats() {
    const bookedSeats = [];
    for (let booking of this.show.bookings) {
      bookedSeats.push(...booking.seats);
    }
    return bookedSeats
  }

  subtractTicket(event) {
    // l33t h4xx to get the ticket type as a string based on class name of parent of clicked element
    const ticketType = $(event.target).parent().attr('class').split(' ')[1];
    if (this.tickets[ticketType] > 0) {
      this.tickets[ticketType]--;
      this.render();
    }
  }

  addTicket(event) {
    if (this.ticketsCount < 8) {
      const ticketType = $(event.target).parent().attr('class').split(' ')[1];
      this.tickets[ticketType]++;
      this.render();
    }
  }

  removeSeatHighlight() {
    // removes the seat highlighting on mouseover
    for (let seat of this.highlightedSeats) {
      seat.baseEl.removeClass('highlighted-seat');
    }
    this.highlightedSeats = [];
  }

  highlightSeatSelection(event) {
    let seatNumber = event.detail.seat.seatNumber;
    // get all seat numbers for the prospective booking
    const allSeatNumbers = [];
    while (allSeatNumbers.length < this.ticketsCount) {
      allSeatNumbers.push(seatNumber--);
    }
    // megah4xx to make an array of the actual seats, based on the numbers
    const allSeats = [];
    for (let seatNumber of allSeatNumbers) {
      allSeats.push(this.seatMap.rows.flat().find(seat => seat.seatNumber === seatNumber));
    }
    // hook up our validator function
    const isValidSelection = this.validateSeatSelection(allSeats);
    if (isValidSelection) {
      // highlight the prospective seats
      this.highlightedSeats = allSeats;
      for (let seat of allSeats) {
        seat.baseEl.addClass('highlighted-seat');
      }
    } else {
      // do whatever it is we want to do when user hovers over an invalid seat selection
    }
  }

  validateSeatSelection(seats) {
    const row = seats[0].row;
    // for each seat, check if 1) it doesn't exist 2) it's booked already 3) its on another row. if any of these are true, the selection is invalid
    for (let seat of seats) {
      if (!seat || seat.booked || seat.row !== row) {
        return false
      }
    }
    return true
  }

  selectSeats() {
    // remove selected class from old selection
    for (let seat of this.selectedSeats) {
      seat.baseEl.removeClass('selected-seat');
    }
    //select the highlighted seats and give them the selected class, remove highlight class
    this.selectedSeats = this.highlightedSeats;
    for (let seat of this.selectedSeats) {
      seat.baseEl.addClass('selected-seat').removeClass('highlighted-seat');
    }
  }

  async sendBookingRequest() {
    const booking = new Booking({
      show: this.show._id,
      seats: this.selectedSeats.map(seat => seat.seatNumber),
      tickets: this.tickets
    });


    const result = await booking.save();
    console.log(result);

  }
}