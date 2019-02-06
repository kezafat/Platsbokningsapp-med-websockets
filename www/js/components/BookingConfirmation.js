class BookingConfirmation extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.user = new User(this.user);

    this.getBooking();
  }

  async getBooking() {
   
    let tickets = {
      child: 65,
      senior: 75,
      adult: 85,
    }
    let user = await User.find(`.find({name: /Eldräven/}).populate('bookings').exec()`);
    console.log(user);
    let price = 0;
    price += user.bookings[0].tickets.adult * 75;
    price += user.bookings[0].tickets.kids * 55;
    price += user.bookings[0].tickets.senior * 65;
    console.log(price);
    console.log(tickets);
  }
}



