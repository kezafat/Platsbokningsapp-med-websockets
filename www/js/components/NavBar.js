class NavBar extends Component {
  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Filmer', '/filmer'),
      new NavItem('Visningar', '/movies-schedule-page'),
      new NavItem('Om Oss', '/om-oss'),

    ];
  }
}