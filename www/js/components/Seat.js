class Seat extends Component {
  constructor(seatNumber, row, booked = false, evaluation) {
    super();
    this.seatNumber = seatNumber;
    this.booked = booked;
    this.row = row;
    this.evaluation = evaluation;
    this.addEvents({
      'mouseover': 'handleMouseOver',
      'mouseleave': 'handleMouseLeave',
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

  // this event does not "need" to be here, but it is here bc the mouseover event is here and they are closely related
  handleMouseLeave() {
    const event = new CustomEvent('mouseleaveSeat', {
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }
}