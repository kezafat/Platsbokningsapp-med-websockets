class BookShowPage extends Component {
  constructor() {
    super();
    this.addRoute('/book-show', 'Boka Visning');
    this.addEvents({
      'click .minus': 'subtractTicket',
      'click .plus': 'addTicket',
      'click .back-button': 'goBack',
      'click #book-tickets': 'sendBookingRequest'
    });
    this.selectedShow = {};
    this.setSelectedShow();
    this.tickets = {
      adult: 2,
      senior: 0,
      kids: 0
    }
  }

  get ticketsCount() {
    return this.tickets.adult + this.tickets.senior + this.tickets.kids
  }

  async setSelectedShow() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('show');
    this.selectedShow = await Show.find(showId);
    this.seatSelector = new SeatSelector(this.selectedShow, this);
    this.render();
  }

  mount() {
    this.setSelectedShow();
  }

  unmount() {
    this.selectedShow = {};
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
    }
  }

  addTicket(event) {
    if (this.ticketsCount < 8) {
      const ticketType = $(event.target).parent().attr('class').split(' ')[1];
      this.tickets[ticketType]++;
      this.render();
      this.seatSelector.suggestBestSeats();
    }
  }

  async sendBookingRequest() {
    const booking = new Booking({
      show: this.selectedShow._id,
      seats: this.seatSelector.selectedSeats.map(seat => seat.seatNumber),
      tickets: this.tickets
    });
    const result = await booking.save();
    console.log(result);
  }
}