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
        const seatEvaluation = this.evaluateSeat(i + 1, seats.length, seats[i], j + 1);
        this.rows[i].unshift(new Seat(++this.seatCount, i + 1, bookedSeats.includes(this.seatCount) ? true : false, seatEvaluation));
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

  evaluateSeat(row, totalRows, seatsInRow, seatPositionInRow) {
    // evaluate the seat based on how close it is to the center of the cinema
    let evaluation = 100;
    // the "best row" is currently the one in the middle
    const bestRow = Math.ceil((totalRows + 1)/2);
    // adjust the evaluation based on how many rows from the best row you are seated
    evaluation -= Math.abs(row - bestRow);
    // adjust the evaluation, picking the best evaluation you get from rounding the number of seats up and down to determine the "middle" incase theres an even nr of seats
    // multiply by two to make seats distance from center of row 'weigh' more
    const seatEvaluation = Math.min(
      Math.abs(seatPositionInRow - Math.floor(seatsInRow / 2)),
      Math.abs(seatPositionInRow - Math.ceil(seatsInRow / 2)),
    ) * 2;
    evaluation -= seatEvaluation;
    return evaluation
  }
}