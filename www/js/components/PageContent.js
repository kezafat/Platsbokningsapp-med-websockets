class PageContent extends Component {
  constructor(navBar) {
    super();
    this.navBar = navBar;
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.aboutPage = new AboutUs();
    this.moviesSchedulePage = new MoviesSchedulePage();
    this.bookingConfirmationContainer = new BookingConfirmationContainer();
    this.accountPage = new AccountPage(this.navBar);
    this.bookShowContainer = new BookShowContainer();
    this.movieDetailContainer = new MovieDetailContainer();
  }
}
