class NavItem extends Component {

  constructor(name, url) {
    super();
    this.name = name;
    this.url = url;
    this.addEvents({
      'click .nav-link': 'menuCollapser'
    })
  }

  menuCollapser() {
    if ($('.navbar-collapse').hasClass('show')) {
      $('.navbar-collapse').removeClass('show');
    }
  }
}