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
    this.render();
  }
  mount(){
    this.getSelectedBooking();
  }
  bookingTest(){
    let booking = this.booking[0];
    let title = booking.show.movie.title;
    let img = booking.show.movie.images[0];
    let auditoria = booking.show.auditorium.name;
    let date = booking.show.date;
    let time = booking.show.time;
    let seats = booking.seats.join(", ");
    let tempPrice = []
    for (const price in booking.tickets ) {
      for(let i = 0; i < price; i++){
        tempPrice.push(this.ticketPrice[i][price]);
      }
    }
    console.log(booking.tickets);
    
    function getSum(total, num){
      return total + num
    }
    let totPrice = tempPrice.reduce(getSum);
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <img src="/images/${img}">
      <h6 class="card-subtitle mb-2 text-muted">${auditoria}</h6>
      <p class="card-text">${time} ${date}</p>
      <p class="card-text">Platser: ${seats}</p>
      <p class="card-text font-weight-bold">Total Pris: ${totPrice}kr</p>
    </div>
  </div>`
  }
}