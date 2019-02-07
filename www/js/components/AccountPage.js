class AccountPage extends Component {

  constructor(navBar) {
    super();
    this.addRoute('/mitt-konto', 'Mitt konto');
    this.navBar = navBar;
    this.loginHandler = new LoginHandler(this.navBar, this);
    this.addEvents({
      'click .logOutBtn': 'logOut',
      'click .loginBtn': 'logIn',
      'click .registerBtn': 'register',
      'click .testrest': 'testrest'
    });
    this.loggedIn = false;
    this.loginNotify = "";
    this.registerNotify = "";
    // Remove this after test
    this.userstring = "";
    this.userData = {};
    this.checkUserLoginState();
  }

  async testrest() {
    let id = this.userData._id;
    let testrest = await User.find(`.findById("${id}")`);
    // Remove this after test
    let stringified = JSON.stringify(testrest);
    this.userstring = stringified;
    this.render();
  }

  async checkUserLoginState() {
    let state = await this.loginHandler.checkLogin()
    if (state.msg == "ok") {
      this.updateUserData(state);
      this.loginState(true);
    } else {
      this.loginState(false);
    }
  }

  updateUserData(state) {
    // Accept userdata from backend
    Object.assign(this.userData, state);
  }

  loginState(bool) {
    if (bool) {
      this.clearNotifications();
    }
    this.loggedIn = bool;
    this.render();
    this.navBar.updateNavStatus(this);
  }

  async logIn() {
    let userData = {
      "email": $('.loginUserEmail').val(),
      "password": $('.loginUserPassword').val()
    }

    if (!this.loginHandler.emailValidator(userData.email) || !userData.password) {
      this.redirectToLogin("Kontrollera att du har en giltig e-post adress och att du fyllt i ett lösenord.");
      return;
    }

    let res = await this.loginHandler.loginUser(userData);

    if (res.msg == "ok") {
      this.updateUserData(res);
      this.loginState(true);
    } else if (res.msg == "goregister") {
      this.redirectToRegister('Du är ännu inte medlem. Skapa gärna ett konto :)');
    } else if (res.msg == "badpass") {
      this.redirectToLogin('Hmm.. säker på ditt lösen?');
    }
  }

  async logOut() {
    let status = await this.loginHandler.logOut();

    if (status.msg == "ok") {
      this.loginState(false);
      this.userData = {};
      this.render();
    }
  }

  async register() {
    let userData = {
      "email": $('.regUserEmail').val(),
      "name": $('.regUserName').val(),
      "password": $('.regUserPassword').val()
    }

    if (!this.loginHandler.emailValidator(userData.email) || !userData.password || !userData.name) {
      this.redirectToRegister("Alla fält måste vara korrekt ifyllda.");
      return;
    }

    let res = await this.loginHandler.registerUser(userData);

    if (res.msg == "ok") {
      this.updateUserData(res);
      this.loginState(true);
    } else if (res.msg == "login") {
      this.redirectToLogin('Hur många konton ska du ha egentligen? Logga in istället :P');
    }

  }


  redirectToLogin(msg) {
    this.loginNotify = msg;
    this.render();
    $('#collapseLogin').collapse()
  }

  redirectToRegister(msg) {
    this.registerNotify = msg;
    this.render();
    $('#collapseRegister').collapse();
  }

  clearNotifications() {
    this.loginNotify = "";
    this.registerNotify = "";
    this.render();
  }

}