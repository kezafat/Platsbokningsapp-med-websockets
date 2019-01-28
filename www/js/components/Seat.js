class Seat extends Component {
  constructor(seatNumber, row, booked = false) {
    super();
    this.seatNumber = seatNumber;
    this.booked = booked;
    this.row = row;
    this.addEvents({
      'mouseover': 'handleMouseOver'
    });
  }

  handleMouseOver() {
    const event = new CustomEvent('mouseoverSeat', {
      detail: { seat: this },
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }
}