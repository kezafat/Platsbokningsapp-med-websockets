class SeatRow extends Component {
  constructor(startNumber, endNumber) {
    super();
    this.seats = [];
    for (let i = startNumber; i <= endNumber; i++) {
      this.seats.unshift(new Seat(i));
    }
  }
}