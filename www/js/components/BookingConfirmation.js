class BookingConfirmation extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.user = new User(this.user)
    this.getUser();
    this.getTickets();
  }

  async getUser(){
    let users = await User.find(`.find({name: /jesus/}).populate('bookings show').exec()`);
    // console.log(users);
  }

  async getTickets(){
    let users = await User.find(`.find({name: /jesus/}).populate('bookings show').exec()`);
    let child = 65;
    let senior = 75;
    let adult = 85;
    let tickets = users;
    for (let ticket in tickets){
      console.log(tickets[ticket])
    }
  }
}