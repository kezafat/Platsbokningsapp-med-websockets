class BookShow extends Component {
  constructor() {
    super();
    // for now this component has its own route but in the future it might not need one depending on how we build the PAEG
    this.addRoute('/book-show', 'Boka Visning');
    this.addEvents({
      'click #select-show': 'selectShow'
    });
    this.shows = [];
    this.fetchShows();
    this.selectedShow = {};
  }

  async fetchShows() {
    const shows = await fetch('http://localhost:3000/json/shows', {
      method: 'GET'
    });
    this.shows = await shows.json();
    this.render();
  }

  generateShowsList() {
    let html = '';
    for (let show of this.shows) {
      html += `<option value="${show._id}">${show.date} ${show.time}</option>`
    }
    return html
  }

  async selectShow() {
    const showId = this.baseEl.find('#show-select').val();
    this.selectedShow = await Show.find(showId);
    this.seatSelector = new SeatSelector(this.selectedShow);
    this.render();
  }

}