class BookShowContainer extends Component {
  constructor() {
    super();
    this.addRoute('/book-show', 'Boka Visning');
    this.showFetched = false;
  }

  async setSelectedShow() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('show');
    // if the showid is null we don't have a show to set :()
    if (showId === null) { return }
    const show = await Show.find(showId);
    this.bookShowPage = new BookShowPage(show);
    this.showFetched = true;
    this.render();
  }

  mount() {
    this.setSelectedShow();
  }

  unmount() {
    this.showFetched = false;
    // we have to trigger bookshowpage unmount manually bc the framework only triggers it for components with routes
    this.bookShowPage && this.bookShowPage.unmount();
  }
}