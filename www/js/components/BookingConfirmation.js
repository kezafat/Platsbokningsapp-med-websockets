class BookingConfirmation extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.user = new User(this.user)
    this.booking = {};
    this.getSelectedBooking();
  }

  async getSelectedBooking() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    this.booking = await Booking.find(id);
    this.render();
  }
  mount() {
    this.getSelectedBooking();
  }
  get ticketPrice() {
    return (this.booking.tickets.adult * 85) + (this.booking.tickets.senior * 75) + (this.booking.tickets.kids * 65);
  }
  get adultPrice() {
    return (this.booking.tickets.adult * 85)
  }
  get seniorPrice() {
    return (this.booking.tickets.senior * 75)
  }
  get kidsPrice() {
    return (this.booking.tickets.kids * 65)
  }
}



