class NavBar extends Component {
  constructor(pageContent) {
    super();
    this.pageContent = pageContent;
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Filmer', '/filmer'),
      new NavItem('Visningar', '/visningar'),
      new NavItem('Om Oss', '/om-oss'),
    ];
    this.addEvents({
      'click .navStatus': 'popModal'
    });
    this.navStatus = ""
    this.showLogin = false;
    this.showRegister = false;
  }

  updateNavStatus(name, callback = this) {
    this.navStatus = name;
    this.render();
    callback.render();
  }

  popModal() {
    // Popping a modal that actually is in another template (LoginHandler.html)
    $('#userModal').modal('show')
  }
}