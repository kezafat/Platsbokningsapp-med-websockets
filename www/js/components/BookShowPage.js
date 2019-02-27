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
    this.listenToSocketIo();
  }

  unmount() {
    // I did not manage to unbind the listener properly because I had to bind the handler function, and binding returns a new function
    // so I have to remove all event handlers for App.socket upon dismount. Sorry
    App.socket.off();
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
      this.baseEl.find('#book-tickets').removeClass('disabled');
    } else {
      this.baseEl.find('.invalid-selection-alert').show();
      this.baseEl.find('#book-tickets').addClass('disabled');
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
    this.baseEl.find('.invalid-booking-alert').hide();
    if (!AccountPage.auth) {
      this.baseEl.find('#book-tickets').addClass('disabled');
      return this.baseEl.find('.not-logged-in-alert').show();
    }
    if (this.seatSelector.selectedSeats.length !== this.ticketsCount) {
      return this.baseEl.find('.invalid-selection-alert').show();
    }
    const booking = new Booking({
      show: this.selectedShow._id,
      seats: this.seatSelector.selectedSeats.map(seat => seat.seatNumber),
      tickets: this.tickets
    });
    App.socket.off();
    const result = await booking.save();
    if (!result._id) {
      // this indicates that the booking was not successful
      this.listenToSocketIo();
      return this.baseEl.find('.invalid-booking-alert').show();
    }
    // this happens when the booking is successful
    let stateObj = { booking: booking._id };
    let bookingConfPath = `booking-confirmation?id=${booking._id}&ticket=${booking.ticketID}`;
    history.pushState(stateObj, "Boknings Bekräftelse", bookingConfPath);
    let fastReload = document.createElement("a");
    $(fastReload).attr('href', '/' + bookingConfPath)
    this.baseEl.append(fastReload);
    $(fastReload).click();
    window.scrollTo(0, 0);

  }

  listenToSocketIo() {
    // we have to bind this, otherwise 'this' refers to some socket.io thing
    App.socket.on('newBooking' + this.selectedShow._id, this.addBooking.bind(this));
  }

  addBooking(booking) {
    // push it to bookings array
    this.selectedShow.bookings.push(booking);
    // a conflict arises if someone has booked the seats we have currently selected
    let seatConflict = false;
    // flag & tag the seats
    for (let seatNumber of booking.seats) {
      const seat = this.seatSelector.seatMap.rows.flat().find(seat => seat.seatNumber === seatNumber);
      if (!seat) {
        return ''
      }
      seat.booked = true;
      seat.baseEl.addClass('booked');
      if (this.seatSelector.selectedSeats.includes(seat)) {
        seatConflict = true;
      }
    }
    if (seatConflict) {
      this.baseEl.find('.seats-stolen-alert').show();
      this.limitTicketsCount();
      this.seatSelector.suggestBestSeats();
      // this is a safety for separate seats to make sure new seats are suggested
      while (this.seatSelector.selectedSeats.length < this.ticketsCount) {
        this.seatSelector.addOneSeatToSelection();
      }
    }
  }

  limitTicketsCount() {
    while (this.ticketsCount > this.freeSeatsCount) {
      for (let ticketType in this.tickets) {
        if (this.tickets[ticketType] > 0) {
          this.baseEl.find('.' + ticketType + ' .ticket-count').html(--this.tickets[ticketType]);
          break;
        }
      }
    }
  }
}
