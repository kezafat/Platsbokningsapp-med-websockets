const bcrypt = require('bcrypt');

module.exports = class LoginHandler {

  constructor(app, User) {
    this.app = app;
    this.User = User;
    this.createLoginRoute();
    this.createCheckIfLoggedInRoute();
    this.createLogoutRoute();
    this.createRegisterRoute();
  }

  createRegisterRoute() {
    this.app.post('/register', async (req, res) => {
      let data = req.body;
      // Now post some data about the user and store it in DB
    })
  }

  createLoginRoute() {

  }

  createCheckIfLoggedInRoute() {

  }

  createLogoutRoute() {

  }

}