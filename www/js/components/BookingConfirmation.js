class BookingConfirmation extends Component {
  constructor() {
    super();
    this.addRoute('/booking-confirmation', 'Boknings Bekräftelse');
    this.user = new User(this.user)
    this.getUser();
  }
  async getUser(){
    let users = await User.find();
    console.log(users);
  }
  
}