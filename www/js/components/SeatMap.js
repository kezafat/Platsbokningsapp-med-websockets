class SeatMap extends Component {
  constructor(seats, bookedSeats) {
    super();
    this.rows = [];
    // set to 0 because so far we have 0 seats
    this.seatCount = 0;
    this.generateSeats(seats, bookedSeats);
  }

  generateSeats(seats, bookedSeats) {
    for (let i = 0; i < seats.length; i++) {
      // for each row, create an empty array in the rows array
      this.rows[i] = [];
      // fill it with the correct number of seats:
      for (let j = 0; j < seats[i]; j++) {
        this.rows[i].unshift(new Seat(++this.seatCount, i + 1, bookedSeats.includes(this.seatCount) ? true : false));
      }
    }
  }

  generateSeatMapHtml() {
    let html = '';
    for (let i = 0; i < this.rows.length; i++) {
      html += `<div>${this.rows[i]}</div>`
    }
    return html
  }
}