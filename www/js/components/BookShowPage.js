class BookShowPage extends Component {
  constructor(show) {
    super();
    this.addEvents({
      'click .minus': 'subtractTicket',
      'click .plus': 'addTicket',
      'click .back-button': 'goBack',
      'click #book-tickets': 'sendBookingRequest',
      'seatSelectionChange': 'toggleInvalidSelectionAlert'
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

  get isValidSelection() {
    return this.ticketsCount === this.seatSelector.selectedSeats.length
  }

  toggleInvalidSelectionAlert() {
    if (this.isValidSelection) {
      this.baseEl.find('.invalid-selection-alert').hide();
    } else {
      this.baseEl.find('.invalid-selection-alert').show();
    }
  }

  goBack() {
    history.back();
  }

  subtractTicket(event) {
    // l33t h4xx to get the ticket type as a string based on class name of parent of clicked element
    const ticketType = $(event.target).parent().attr('class').split(' ')[1];
    if (this.tickets[ticketType] > 0) {
      // increment the ticket type count and output the new value in the DOM
      $(event.target).siblings('.ticket-count').html(--this.tickets[ticketType]);
      this.seatSelector.limitTicketCount();
      this.toggleInvalidSelectionAlert();
    }
  }

  addTicket(event) {
    if (this.ticketsCount < 8 && this.ticketsCount < this.freeSeatsCount) {
      // get the ticket type as a string
      const ticketType = $(event.target).parent().attr('class').split(' ')[1];
      // increment the ticket type count and output the new value in the DOM
      $(event.target).siblings('.ticket-count').html(++this.tickets[ticketType]);
      // this.seatSelector.suggestBestSeats();
      while (this.seatSelector.selectedSeats.length < this.ticketsCount) {
        this.seatSelector.addOneSeatToSelection();
      }
    }
  }

  async sendBookingRequest() {
    if (this.seatSelector.selectedSeats.length !== this.ticketsCount) {
      return this.baseEl.find('.invalid-selection-alert').show();
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
