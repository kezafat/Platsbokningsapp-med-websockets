class BookingConfirmation extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.user = new User(this.user)
    this.booking = {};
    this.ticketPrice = {
      adult: 85,
      senior: 75,
      kids: 65
    }
    this.getSelectedBooking();
  }

  async getSelectedBooking(){
    let id = location.search.split("id=");
    id.shift();
    id = id.join();
    this.booking = await Booking.find(id);
    this.render();
  }
  mount(){
    this.getSelectedBooking();
  }
}