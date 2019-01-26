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
      let data = req.body;
      let user = await this.User.findOne({ email: data.email });

      if (user) {
        // Mongoose unique returns result and reveals hashed pwd
        // Already in DB, redirect user to login screen
        res.json({"msg": "Plz log in, redirecting..."});
        return;
      }

      if (!data.password) {
        res.json({ "msg": "Pwd cannot be empty" });
        return;
      }

      // Add the account
      let encryptedPwd = await bcrypt.hash(data.password + passwordSalt, 10);
      data.password = encryptedPwd;
      let newUser = new this.User(data);
      let err, result = await newUser.save().catch(error => err = error);
      result.password = "hiddenPassword, no need to send this data back now is there ;D";
      res.json(err || "ok");
    })
  }

  createLoginRoute() {

  }

  createCheckIfLoggedInRoute() {

  }

  createLogoutRoute() {

  }

}