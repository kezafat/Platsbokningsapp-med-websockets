class PageContent extends Component {
  constructor(){
    super();
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.showsPage = new ShowsPage();
    this.aboutPage = new AboutUs();
  }

    // Auto-login user if session auth is true
    this.checkLogin();
  }

  checkLogin() {
    let that = this;
    $.post('/login', function (res) {
      if (res.msg === 'ok') {
        that.greetUser(res.user);
      }
    });
  }

  addNewUser() {
    let userData = {
      "email": $('#userEmail').val(),
      "name": $('#userName').val(),
      "password": $('#userPassword').val()
    }

    let that = this;
    $.ajax({
      url: '/register',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(userData),
      success: function (res) {
        if (res.msg == "ok") {
          that.auth = true;
          that.user = res.user;
          that.greetUser(res.user);
        } else {
          // Check for "ok". Anything else is error!
        }
      }
    });
  }

  loginUser() {
    let userData = {
      "email": $('#userEmail').val(),
      "name": $('#userName').val(),
      "password": $('#userPassword').val()
    }

    let that = this;
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(userData),
      success: function (res) {
        if (res.msg == "ok") {
          that.user = res.user;
          that.auth = true;
          that.greetUser(res.user);
        } else {
          // Check for "ok". Anything else is error!
        }
      }
    });
  }

  logOut() {
    let that = this;
    $.post('/logout', function (res) {
      if (res.msg === 'ok') {
        that.loggedOut = true;
        that.auth = false;
        that.user = "";
        that.greeting = false;
        that.render();
      }
    });
  }

  greetUser(user) {
    this.greeting = true;
    this.loggedOut = false;
    this.user = user;
    this.render();
  }

}
