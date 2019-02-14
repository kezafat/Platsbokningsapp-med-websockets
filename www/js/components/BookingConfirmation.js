class BookingConfirmation extends Component {
  constructor(booking) {
    super();
    this.selectedBooking = booking;
  }
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



