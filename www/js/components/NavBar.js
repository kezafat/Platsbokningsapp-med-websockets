class NavBar extends Component {
  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Filmer', '/filmer'),
      new NavItem('Biografer', '/biografer'),
      new NavItem('Visningar', '/visningar'),
      new NavItem('Om Oss', '/om-oss'),
    ];
    this.navStatus = 'Laddar..';
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