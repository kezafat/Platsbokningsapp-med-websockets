class SeatSelector extends Component {
  constructor(show, bookShowPage) {
    super();
    this.show = show;
    this.bookShowPage = bookShowPage
    this.addEvents({
      'mouseoverSeat': 'highlightSeatSelection',
      'mouseleaveSeat': 'removeSeatHighlight',
      'click span.seat': 'selectSeats'
    });
    this.seatMap = new SeatMap(this.show.auditorium.seats, this.bookedSeats);
    this.highlightedSeats = [];
    this.selectedSeats = [];
  }

  mount() {
    this.suggestBestSeats();
  }

  get bookedSeats() {
    const bookedSeats = [];
    for (let booking of this.show.bookings) {
      bookedSeats.push(...booking.seats);
    }
    return bookedSeats
  }

  removeSeatHighlight() {
    // removes the seat highlighting on mouseover
    for (let seat of this.highlightedSeats) {
      seat.baseEl.removeClass('highlighted-seat');
    }
    this.highlightedSeats = [];
  }

  highlightSeatSelection(event) {
    let seatNumber = event.detail.seat.seatNumber;
    // get all seat numbers for the prospective booking
    const allSeatNumbers = [];
    while (allSeatNumbers.length < this.bookShowPage.ticketsCount) {
      allSeatNumbers.push(seatNumber--);
    }
    // megah4xx to make an array of the actual seats, based on the numbers
    const allSeats = [];
    for (let seatNumber of allSeatNumbers) {
      allSeats.push(this.seatMap.rows.flat().find(seat => seat.seatNumber === seatNumber));
    }
    // hook up our validator function
    const isValidSelection = this.validateSeatSelection(allSeats);
    if (isValidSelection) {
      // highlight the prospective seats
      this.highlightedSeats = allSeats;
      for (let seat of allSeats) {
        seat.baseEl.addClass('highlighted-seat');
      }
    } else {
      // do whatever it is we want to do when user hovers over an invalid seat selection
    }
  }

  validateSeatSelection(seats) {
    const row = seats[0].row;
    // for each seat, check if either 1) it doesn't exist 2) it's booked already 3) its not on the same row as the 1st seat in the selection. if any of these are true, the selection is invalid
    for (let seat of seats) {
      if (!seat || seat.booked || seat.row !== row) {
        return false
      }
    }
    return true
  }

  selectSeats() {
    // remove selected class from old selection
    for (let seat of this.selectedSeats) {
      seat.baseEl.removeClass('selected-seat');
    }
    // select the highlighted seats and give them the selected class, remove highlight class
    this.selectedSeats = this.highlightedSeats;
    this.highlightSelectedSeats();
  }

  highlightSelectedSeats() {
    for (let seat of this.selectedSeats) {
      seat.baseEl.addClass('selected-seat').removeClass('highlighted-seat');
    }
  }

  suggestBestSeats() {
    const nOfTickets = this.bookShowPage.ticketsCount;
    let bestSelection = [];
    let bestEvaluation = -1000;
    // find out what the best evaluation for all possible combinations (of seats next to eachother) is
    for (let row of this.seatMap.rows) {
      for (let i = 0; i <= row.length - nOfTickets; i++) {
        // first validate the selected seats
        const selectedSeats = row.slice(i, i + nOfTickets)
        if (this.validateSeatSelection(selectedSeats)) {
          // then check if we have a new highest evaluation, if so, save selection
          const evaluation = selectedSeats.reduce((acc, seat) => { return acc + seat.evaluation }, 0);
          if (evaluation > bestEvaluation) {
            bestEvaluation = evaluation;
            bestSelection = selectedSeats;
          }
        }
      }
    }
    this.selectedSeats = bestSelection;
    this.highlightSelectedSeats();
  }
}