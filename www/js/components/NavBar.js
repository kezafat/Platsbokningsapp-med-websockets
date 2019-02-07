class NavBar extends Component {
  constructor(pageContent) {
    super();
    this.pageContent = pageContent;
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Filmer', '/filmer'),
      new NavItem('Visningar', '/movies-schedule-page'),
      new NavItem('Om Oss', '/om-oss'),

    ];
    this.navStatus = "Laddar..";
    // Just for fun coloring
    this.loggedIn = false;
  }

  updateNavStatus(AccountPageStatus) {
    if (AccountPageStatus.loggedIn) {
      this.navStatus = AccountPageStatus.userData.name;
      this.loggedIn = true;
    } else {
      this.navStatus = "Logga in";
      this.loggedIn = false;
    }
    this.render();
  }

}