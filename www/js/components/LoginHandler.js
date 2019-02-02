class LoginHandler extends Component {
  constructor(navBar, accountPage) {
    super();
    this.navBar = navBar;
    this.accountPage = accountPage;
  }

  checkLogin() {
    let that = this;
    return new Promise(function (resolve, reject) {
      $.post('/login', function (res) {
        resolve(res);
      });
    })
  }

  registerUser(userData) {
    let that = this;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '/register',
        method: 'POST',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(userData),
        success: function (res) {
          resolve(res);
        }
      });
    })

  }

  loginUser(userData) {
    let that = this;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(userData),
        success: function (res) {
          resolve(res);
        }
      });
    })
  }

  logOut() {
    let that = this;
    return new Promise(function (resolve, reject) {
      $.post('/logout', function (res) {
        resolve(res)
      });
    })
  }

  emailValidator(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}