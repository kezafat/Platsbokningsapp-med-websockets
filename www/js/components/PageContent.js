class PageContent extends Component {
  constructor(navBar) {
    super();
    this.addEvents({
      'click .ttb': 'scrollUp'
    })
    this.navBar = navBar;
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.aboutPage = new AboutUs();
    this.moviesSchedulePage = new MoviesSchedulePage();
    this.bookingConfirmationContainer = new BookingConfirmationContainer();
    this.accountPage = new AccountPage(this.navBar);
    this.bookShowContainer = new BookShowContainer();
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
