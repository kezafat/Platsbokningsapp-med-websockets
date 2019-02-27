class PageContent extends Component {
  constructor(navBar) {
    super();
    this.addEvents({
      'click .ttb': 'scrollUp'
    })
    this.navBar = navBar;
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.moviesSchedulePage = new MoviesSchedulePage();
    this.bookingConfirmationContainer = new BookingConfirmationContainer();
    this.accountPage = new AccountPage(this.navBar);
    this.bookShowContainer = new BookShowContainer();
    this.movieDetailContainer = new MovieDetailContainer();
    this.auditoriaContainer = new AuditoriaContainer();
    this.movieDetailContainer = new MovieDetailContainer();
  }

  scrollUp() {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
  }
}
