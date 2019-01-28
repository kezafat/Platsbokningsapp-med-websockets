class SeatSelector extends Component {
  constructor(show) {
    super();
    this.show = show;
    this.addEvents({
      'click .minus': 'subtractTicket',
      'click .plus': 'addTicket',
      'mouseoverSeat': 'hoverSeatSelection'
    });
    this.tickets = {
      normal: 2,
      senior: 0,
      child: 0
    }
    this.seatMap = new SeatMap(this.show.auditorium.seats, this.bookedSeats);
  }

  get ticketsCount() {
    return this.tickets.normal + this.tickets.senior + this.tickets.child
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

  hoverSeatSelection(event) {
    $('.user-select').each(function(index, element) {$(element).removeClass('user-select')});
    let seatNumber = event.detail.seat.seatNumber;
    const row = event.detail.seat.row;
    // get all seats for the prospective booking
    const allSeatNumbers = [];
    while (allSeatNumbers.length < this.ticketsCount) {
      allSeatNumbers.push(seatNumber--);
    }
    const allSeats = [];
    for (let seatNumber of allSeatNumbers) {
      allSeats.push(this.seatMap.rows.flat().find(seat => seat.seatNumber === seatNumber))
    }
    for (let seat of allSeats) {
      seat.baseEl.addClass('user-select');
    }
  }
}