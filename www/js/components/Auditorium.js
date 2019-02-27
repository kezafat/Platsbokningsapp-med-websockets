class Auditorium extends Component {
  static get baseRoute() {
    return 'auditoria/'
  }

  constructor(props) {
    super(props)
    if (this.shows) {
      const now = new Date().toISOString().split('T');
      //set time format and add current date to first movie viewing
      const currentDate = now[0];
      const currentTime = now[1].split(':').slice(0, 2).join(':');
      this.shows = this.shows.filter(show => {
        if (show.date > currentDate) {
          return true
        } else if (show.date === currentDate && show.time > currentTime) {
          return true
        } else {
          return false
        }
      });
      this.shows.sort((a, b) => {
        if (a.date < b.date) { return -1 }
        else if (a.date > b.date) { return 1 }
        else if (a.time < b.time) { return -1 }
        else if (a.time > b.time) { return 1 }
        else { return 0 }
      });
    }
  }

  get totalSeats() {
    return this.seats.reduce((acc, cur) => acc + cur, 0)
  }

  generateShowsHtml() {
    const shows = this.shows.slice(0, 3);
    let html = '';
    for (let show of shows) {
      const freeSeats = this.totalSeats - show.bookings.map(booking => booking.seats).flat().length;
      html += `
              <div class="row my-3">
                <div class="col-12 col-sm-auto">${show.date} ${show.time}</div>
                <div class="col-12 col-sm-auto">${show.movie.title}</div>
                <div class="col-12 col-md d-flex justify-content-end justify-content-sm-end"><a class="btn btn-outline-danger btn-sm float-md-right" href="/book-show?show=${show._id}">${freeSeats} kvar av ${this.totalSeats} -></a></div>
              </div>
      
      `
    }
    return html
  }
}