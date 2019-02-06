class BookShowPage extends Component {
  constructor() {
    super();
    // for now this component has its own route but in the future it might not need one depending on how we build the PAEG
    this.addRoute('/book-show', 'Boka Visning');
    this.addEvents({
    });
    this.selectedShow = {};
  }

  setSelectedShow(show) {
    this.selectedShow = show;
    this.seatSelector = new SeatSelector(show);
    this.render();
  }

}