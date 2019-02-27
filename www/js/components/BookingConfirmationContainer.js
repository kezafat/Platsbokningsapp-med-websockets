class BookingConfirmationContainer extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.fetchedBooking = false;

  }
  async getSelectedBooking() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === null) { return };
    const booking = await Booking.find(id);
    this.bookingConfirmation = new BookingConfirmation(booking);
    this.fetchedBooking = true;
    this.render();
  }
  mount() {
    this.getSelectedBooking();
  }

  unmount() {
    this.fetchedBooking = false;
  }
}