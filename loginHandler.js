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

  //MANUALLY add these routes (do not allow hackable queries)
  async createRegisterRoute() {
    this.app.post('/register', async (req, res) => {
      let err, data = req.body;
      let user = await this.User.findOne({ email: data.email });

      if (user) {
        // Already in DB, redirect user to login screen
        res.send("login");
        return;
      }

      if (!data.password) {
        res.send("error");
        return;
      }

      // Add the account (I choose to handle all cases myself and respond with pure string responses that frontend can use to handle actions)
      // We've been told that it is not good to expose that mongodb is being used, so this is my workaround.
      let encryptedPwd = await bcrypt.hash(data.password + passwordSalt, 10);
      data.password = encryptedPwd;
      let newUser = new this.User(data);
      let result = await newUser.save().catch(error => err = error);
      // Actually not doing anything with err at all, if things do NOT go as planned, then they are errored and no need to tell frontend that
      // Keeping err around for backend torubleshooting

      // We check for clues in the result String as to how everything went
      let resString = result + "";
      resString = resString.toLowerCase();

      if (resString.search('error') !== -1) {
        res.send("error");
      } else {
        res.send("ok");
        // Since all went well, also store some data in users session.
        req.session.user = data.email;
        req.session.auth = true;
        req.session.save();
      }
    })
  }

  createLoginRoute() {

  }

  createCheckIfLoggedInRoute() {

  }

  createLogoutRoute() {

  }

}