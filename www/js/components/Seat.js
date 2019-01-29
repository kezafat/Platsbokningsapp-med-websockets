class Seat extends Component {
  constructor(seatNumber, row, booked = false) {
    super();
    this.seatNumber = seatNumber;
    this.booked = booked;
    this.row = row;
    this.addEvents({
      'mouseover': 'handleMouseOver',
      'mouseleave': 'handleMouseLeave'
    });
  }

  // create new custom events that we listen for in the SeatSelector component

  handleMouseOver() {
    const event = new CustomEvent('mouseoverSeat', {
      detail: { seat: this },
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }

  handleMouseLeave() {
    const event = new CustomEvent('mouseleaveSeat', {
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }
}