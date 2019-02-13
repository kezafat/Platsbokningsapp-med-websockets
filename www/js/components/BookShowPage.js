class BookShowPage extends Component {
  constructor(show) {
    super();
    this.addEvents({
      'click .minus': 'subtractTicket',
      'click .plus': 'addTicket',
      'click .back-button': 'goBack',
      'click #book-tickets': 'sendBookingRequest'
    });
    this.selectedShow = show;
    this.seatSelector = new SeatSelector(show, this);
    this.tickets = {
      adult: this.freeSeatsCount < 2 ? this.freeSeatsCount : 2,
      senior: 0,
      kids: 0
    }
  }

  get ticketsCount() {
    return this.tickets.adult + this.tickets.senior + this.tickets.kids
  }

  get freeSeatsCount() {
    const totalSeats = this.selectedShow.auditorium.seats.reduce((acc, current) => { return acc + current }, 0);
    const bookedSeats = this.seatSelector.bookedSeats.length;
    return totalSeats - bookedSeats
  }

  goBack() {
    history.back();
  }

  subtractTicket(event) {
    // l33t h4xx to get the ticket type as a string based on class name of parent of clicked element
    const ticketType = $(event.target).parent().attr('class').split(' ')[1];
    if (this.tickets[ticketType] > 0) {
      this.tickets[ticketType]--;
      this.render();
      this.seatSelector.suggestBestSeats();
      this.seatSelector.limitTicketCount();
    }
  }

  addTicket(event) {
    if (this.ticketsCount < 8 && this.ticketsCount < this.freeSeatsCount) {
      const ticketType = $(event.target).parent().attr('class').split(' ')[1];
      this.tickets[ticketType]++;
      this.render();
      this.seatSelector.suggestBestSeats();
    }
  }

  async sendBookingRequest() {
    if (this.seatSelector.selectedSeats.length !== this.ticketsCount) {
      return alert('invalid amount of tickets, wtf are you doing m8')
    }
    const booking = new Booking({
      show: this.selectedShow._id,
      seats: this.seatSelector.selectedSeats.map(seat => seat.seatNumber),
      tickets: this.tickets
    });
    const result = await booking.save();
    let stateObj = { booking: booking._id };
    let bookingConfPath =  "booking-confirmation?id=" + booking._id;
    history.pushState(stateObj, "Boknings Bekräftelse", bookingConfPath);
    let fastReload = document.createElement("a");
    $(fastReload).attr('href','/' + bookingConfPath)
    this.baseEl.append(fastReload);
    $(fastReload).click();
    
    // location.reload();
  }
}
