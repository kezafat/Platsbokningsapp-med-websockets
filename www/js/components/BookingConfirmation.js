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
    this.booking = await Booking.find(`.find({_id: "${id}"})`);
    console.log(this.booking)
    this.render();
  }
  mount(){
    this.getSelectedBooking();
  }
  bookingTest(){
    console.log(this.booking)
    return `<p>${this.booking._id}</p>`
  //   let html = "";
  //   let title = this.booking.show.movie.title;
  //   return `<div class="card" style="width: 18rem;">
  //   <div class="card-body">
  //     <h5 class="card-title">${title}</h5>
  //     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
  //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //     <a href="#" class="card-link">Card link</a>
  //     <a href="#" class="card-link">Another link</a>
  //   </div>
  // </div>`
  }
}