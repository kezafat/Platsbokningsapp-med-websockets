class BookingConfirmation extends Component {
  constructor(booking) {
    super();
    // this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    // this.user = new User(this.user)
    // this.booking = {};
    // this.getSelectedBooking();
    this.selectedBooking = booking;
  }

  // async getSelectedBooking() {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const id = urlParams.get('id');
  //   this.booking = await Booking.find(id);
  //   this.render();
  // }
  // mount() {
  //   this.getSelectedBooking();
  // }
  get ticketPrice() {
    return (this.selectedBooking.tickets.adult * 85) + (this.selectedBooking.tickets.senior * 75) + (this.selectedBooking.tickets.kids * 65);
  }
  get adultPrice() {
    return (this.selectedBooking.tickets.adult * 85)
  }
  get seniorPrice() {
    return (this.selectedBooking.tickets.senior * 75)
  }
  get kidsPrice() {
    return (this.selectedBooking.tickets.kids * 65)
  }
}



