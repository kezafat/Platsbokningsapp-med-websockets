class PageContent extends Component {
  constructor(navBar) {
    super();
    this.navBar = navBar;
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.showsPage = new ShowsPage();
    this.aboutPage = new AboutUs();
    this.accountPage = new AccountPage(this.navBar);
  }

}
