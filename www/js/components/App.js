class App extends Component {

  constructor() {
    super();
    this.addRenderMethodToArrays();
    this.navBar = new NavBar();
    this.pageContent = new PageContent(this.navBar);
    this.footer = new Footer();

    new Router(this.pageContent);
    $('body').html(this.render());

  }

  addRenderMethodToArrays() {
    // add a render method to arrays that collect
    // renders for each item
    Array.prototype.render = Array.prototype.render || function () {
      let html = '';
      for (let item of this) {
        html += item.render();
      }
      return html;
    }
    Array.prototype.toString = Array.prototype.render;
  }

}

// Create a new web socket connection to the server
// (available globally via App.socket)
App.socket = io();

// SCROLLEND FUNC
// Adding a scrollback func to ease the pain of long scrolling customers
$.fn.scrollEnd = function (callback, timeout) {
  $(this).scroll(function () {
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback, timeout));
  });
};

// Kalla scrollEnd med timer som rensas om man rör den mer
$(window).scrollEnd(function () {
  if ($(window).scrollTop() > 900) {
    $('.ttb').fadeIn();
  } else {
    $('.ttb').hide();
  }
}, 400);
// EOF SCROLLEND FUNC
