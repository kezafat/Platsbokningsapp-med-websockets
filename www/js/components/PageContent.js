class PageContent extends Component {
  constructor(){
    super();
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.aboutPage = new AboutUs();
    this.moviesSchedulePage = new MoviesSchedulePage();
    this.bookingConfirmation = new BookingConfirmation();
  }
}
