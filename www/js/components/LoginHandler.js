class LoginHandler extends Component {
  constructor(navBar) {
    super();
    this.addEvents({
      'click .addUser': 'registerUser',
      'click .loginUser': 'loginUser',
      'click .logOut': 'logOut'
    });
    this.navBar = navBar;
    this.auth = false;
    this.loggedOut = false;
    this.user = "";
    this.name = "";
    this.notify = "";

    // Auto-login user if session auth is true
    this.checkLogin();
  }

  checkLogin() {
    let that = this;
    $.post('/login', function (res) {
      if (res.msg === 'ok') {
        that.auth = true;
        that.user = res.user;
        that.name = res.name;
        that.navBar.updateNavStatus("Mitt konto", that);
      } else {
        that.auth = false;
        that.navBar.updateNavStatus("Logga in / Skapa konto", that);
      }
    });
  }

  registerUser() {
    let userData = {
      "email": $('.regUserEmail').val(),
      "name": $('.regUserName').val(),
      "password": $('.regUserPassword').val()
    }

    let that = this;
    $.ajax({
      url: '/register',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(userData),
      success: function (res) {
        if (res.msg === "ok") {
          that.auth = true;
          that.user = res.user;
          that.name = res.name;
          $('#userModal').modal('hide').on('hidden.bs.modal', function (e) {
            that.navBar.updateNavStatus("Mitt konto", that);
          })
        } else if (res.msg === "login") {
          // Check for "ok". Anything else is error!
          console.warn("User already exists, go to login page plz");
          that.redirectToLogin();
        }
      }
    });
  }

  loginUser() {
    let userData = {
      "email": $('.loginUserEmail').val(),
      "name": $('.loginUserName').val(),
      "password": $('.loginUserPassword').val()
    }

    let that = this;
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(userData),
      success: function (res) {
        if (res.msg === "ok") {
          that.user = res.user;
          that.name = res.name;
          that.auth = true;
          $('#userModal').modal('hide').on('hidden.bs.modal', function (e) {
            that.navBar.updateNavStatus("Mitt konto", that);
          })
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
        that.name = "";
        that.user = "";
        $('#userModal').modal('hide').on('hidden.bs.modal', function (e) {
          that.navBar.updateNavStatus("Logga in / Skapa konto", that);
        })
      }
    });
  }

  redirectToLogin() {
    let that = this;
    $('#userModal').modal('hide');
    $('#collapseTwo').collapse('toggle').on('hidden.bs.collapse', function () {
      that.notify = "Användare finns redan, det är bara att logga in serru..";
      that.render();
      $('#userModal').modal('show');
      $('#collapseOne').collapse('toggle');
    })
  }


}