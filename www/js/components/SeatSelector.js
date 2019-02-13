class SeatSelector extends Component {
  constructor(show, bookShowPage) {
    super();
    this.show = show;
    this.bookShowPage = bookShowPage
    this.addEvents({
      'mouseoverSeat': 'highlightProspectiveSelection',
      'mouseleaveSeat': 'removeSeatHighlight',
      'click span.seat': 'selectSeats',
      'change #separate-seats': 'setSeparateSeats'
    });
    this.seatMap = new SeatMap(this.show.auditorium.seats, this.bookedSeats);
    this.highlightedSeats = [];
    this.selectedSeats = [];
    this.separateSeats = this.baseEl.find('#separate-seats').prop('checked') || false;
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

  fireSeatSelectionChangeEvent() {
    const event = new CustomEvent('seatSelectionChange', {
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }

  removeSeatHighlight() {
    // removes the seat highlighting on mouseover
    for (let seat of this.highlightedSeats) {
      seat.baseEl.removeClass('highlighted-seat').removeClass('deselect-seat').removeClass('invalid-selection')
    }
    this.highlightedSeats = [];
  }

  highlightProspectiveSelection(event) {
    let seatNumber = event.detail.seat.seatNumber;
    // get all seat numbers for the prospective booking
    const allSeatNumbers = [seatNumber--];
    while (!this.separateSeats && allSeatNumbers.length < this.bookShowPage.ticketsCount) {
      allSeatNumbers.push(seatNumber--);
    }
    // megah4xx to make an array of the actual seats, based on the numbers
    const allSeats = [];
    for (let seatNumber of allSeatNumbers) {
      allSeats.push(this.seatMap.rows.flat().find(seat => seat.seatNumber === seatNumber));
    }
    // hook up our validator function
    const isValidSelection = this.validateSeatSelection(allSeats);
    this.highlightedSeats = allSeats.filter(seat => seat);
    if (isValidSelection) {
      // highlight the prospective seats
      for (let seat of allSeats) {
        seat.baseEl.addClass('highlighted-seat');
      }
    } else {
      for (let seat of this.highlightedSeats) {
        seat.baseEl.addClass('invalid-selection');
      }
    }
    // if seat is already selected and we are in separate seats mode, indicate deselection
    if (this.separateSeats && this.selectedSeats.includes(allSeats[0])) {
      allSeats[0].baseEl.addClass('deselect-seat');
    }
  }


  validateSeatSelection(seats) {
    if (!seats[0] || seats.length > this.bookShowPage.ticketsCount) { return false }
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
    // incase of separate seat selection, handle separately
    if (this.separateSeats) {
      return this.handleAddOrRemoveSeparateSeat();
    }
    // if the selection is valid, allow selection of seats
    if (this.validateSeatSelection(this.highlightedSeats)) {
      // remove selected class from old selection
      for (let seat of this.selectedSeats) {
        seat.baseEl.removeClass('selected-seat');
      }
      // select the highlighted seats and give them the selected class, remove highlight class
      this.selectedSeats = this.highlightedSeats;
      this.highlightSelectedSeats();

    }
  }

  handleAddOrRemoveSeparateSeat() {
    // basically if the seat we are hovering on is in our array of selected seats, remove it, otherwise add it
    const indexOfHighlightedSeat = this.selectedSeats.indexOf(this.highlightedSeats[0]);
    if (indexOfHighlightedSeat !== -1) {
      const seat = this.selectedSeats.splice(indexOfHighlightedSeat, 1)[0];
      seat.baseEl.removeClass('selected-seat');
      this.removeSeatHighlight();
      this.fireSeatSelectionChangeEvent();
      // this is a dirty fix for mobile. it does not fuck anything up because this.highlightedSeats is always assigned to in all other "seat adding" operations
      this.highlightedSeats.push(seat);
      return
    }
    // if the selection is valid, allow selection of seat
    if (this.validateSeatSelection(this.highlightedSeats)) {
      // if we already have max number of tickets, remove one before adding clicked one
      if (this.selectedSeats.length === this.bookShowPage.ticketsCount) {
        this.selectedSeats.pop().baseEl.removeClass('selected-seat');
      }
      this.selectedSeats.push(this.highlightedSeats[0]);
      this.highlightSelectedSeats();
    }
  }

  highlightSelectedSeats() {
    for (let seat of this.selectedSeats) {
      seat.baseEl.addClass('selected-seat').removeClass('highlighted-seat');
    }
    this.fireSeatSelectionChangeEvent();
  }

  deselectSeats() {
    while (this.selectedSeats.length) {
      this.selectedSeats.pop().baseEl.removeClass('selected-seat');
    }
  }

  suggestBestSeats() {
    this.deselectSeats();
    if (this.separateSeats) { return this.highlightSelectedSeats() }
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
          const evaluation = this.evaluateSelection(selectedSeats);
          if (evaluation >= bestEvaluation) {
            bestEvaluation = evaluation;
            bestSelection = selectedSeats;
          }
        }
      }
    }
    if (bestEvaluation !== -1000) {
      this.selectedSeats = bestSelection;
      this.highlightSelectedSeats();
    } else {
      // if the evaluation is still -1000, there were no valid selections of adjacent seats
      this.suggestSeparateSeats();
    }
  }

  evaluateSelection(selection) {
    return selection.reduce((acc, seat) => { return acc + seat.evaluation }, 0);
  }

  suggestSeparateSeats() {
    const nOfTickets = this.bookShowPage.ticketsCount;
    const selectedSeats = [];
    while (selectedSeats.length < nOfTickets && selectedSeats.length < this.bookShowPage.freeSeatsCount) {
      let bestSeat = {};
      for (let seat of this.seatMap.rows.flat()) {
        // if the evaluation is higher than the current highest, and the seat is not already selected, save it as bestSeat
        if (seat.evaluation > (bestSeat.evaluation || -1000) && !selectedSeats.includes(seat) && !seat.booked) {
          bestSeat = seat;
        }
      }
      // "select" the best seat
      selectedSeats.push(bestSeat);
    }
    this.selectedSeats = selectedSeats;
    this.highlightSelectedSeats();
  }

  setSeparateSeats() {
    this.separateSeats = this.baseEl.find('#separate-seats').prop('checked');
    if (!this.separateSeats) {
      for (let seat of this.selectedSeats) {
        seat.baseEl.removeClass('selected-seat');
      }
      this.suggestBestSeats();
    }
  }

  limitTicketCount() {
    if (this.selectedSeats.length > this.bookShowPage.ticketsCount) {
      this.selectedSeats.pop().baseEl.removeClass('selected-seat');
    }
  }

  addOneSeatToSelection() {
    // if there are no seats, suggest the best one
    if (!this.selectedSeats.length) {
      this.suggestBestSeats();
    }
    if (this.separateSeats) {
      // if separate seats is enabled, just add the best remaining seat to the selection
      let bestSeat = {};
      for (let seat of this.seatMap.rows.flat()) {
        // if the evaluation is higher than the current highest, and the seat is not already selected, save it as bestSeat
        if (seat.evaluation >= (bestSeat.evaluation || -1000) && !this.selectedSeats.includes(seat) && !seat.booked) {
          bestSeat = seat;
        }
      }
      this.selectedSeats.push(bestSeat);
      return this.highlightSelectedSeats();
    }
    // this long ass function selects the adjacent seat with the highest evaluation, or a new suggestion of best seats if the current selection cannot be expanded
    const highSeatNumber = this.selectedSeats[0].seatNumber + 1;
    const highSeat = this.seatMap.rows.flat().find(seat => seat.seatNumber === highSeatNumber);
    const lowSeatNumber = this.selectedSeats[this.selectedSeats.length - 1].seatNumber - 1;
    const lowSeat = this.seatMap.rows.flat().find(seat => seat.seatNumber === lowSeatNumber);
    let lowEvaluation, highEvaluation;
    // we use concat as not to modify the original array
    if (this.validateSeatSelection(this.selectedSeats.concat([lowSeat]))) {
      lowEvaluation = this.evaluateSelection(this.selectedSeats.concat([lowSeat]));
    }
    if (this.validateSeatSelection(this.selectedSeats.concat([highSeat]))) {
      highEvaluation = this.evaluateSelection(this.selectedSeats.concat([highSeat]));
    }
    if (lowEvaluation && highEvaluation) {
      if (lowEvaluation >= highEvaluation) {
        this.selectedSeats.push(lowSeat);
        return this.highlightSelectedSeats();
      } else {
        this.selectedSeats.unshift(highSeat);
        return this.highlightSelectedSeats();
      }
    } else if (lowEvaluation) {
      this.selectedSeats.push(lowSeat);
      return this.highlightSelectedSeats();
    } else if (highEvaluation) {
      this.selectedSeats.unshift(highSeat);
      return this.highlightSelectedSeats();
    } else {
      // otherwise, select best suggestion regardless of previously selected seats
      this.suggestBestSeats();
    }

  }
}