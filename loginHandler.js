const bcrypt = require('bcryptjs');

module.exports = class LoginHandler {

  constructor(app, db, User) {
    this.app = app;
    this.db = db;
    this.User = User;
    this.createLoginRoute();
    this.createLogoutRoute();
    this.createRegisterRoute();
    this.createAdminEditRoute();
  }


  async createAdminEditRoute() {
    this.app.post('/admin/edit/:id', async (req, res) => {
      let err;
      // Check for admin auth, if set just redirect to admin page on clientside
      if (req.session.auth === "admin") {
        res.json({ "data": req.body, "params": req.params.id })
        return;
      } else {
        res.json({ "Go": "Away :P" })
        return;
      }
    });
  }


  //MANUALLY add these routes (do not allow hackable queries)
  async createRegisterRoute() {
    this.app.post('/user/register', async (req, res) => {
      let err, data = req.body;
      let user = await this.User.findOne({ email: data.email });

      if (user) {
        // Already in DB, redirect user to login screen
        res.json({ 'msg': 'login', 'res': "Detta konto finns redan!" });
        return;
      }

      if (!data.password) {
        res.json({ 'msg': 'error', 'res': 'Ett lösenord måste anges!' });
        return;
      }
      if (!data.name) {
        res.json({ 'msg': 'error', 'res': 'Du måste ange ett namn!' });
        return;
      }

      let encryptedPwd = await bcrypt.hash(data.password + passwordSalt, 10);
      data.password = encryptedPwd;
      let newUser = new this.User(data);
      let result = await newUser.save().catch(error => err = error);

      if (err) {
        res.json({ 'db': err, 'msg': 'error', 'res': "Något gick fel med databasen :(" });
        return;
      }

      req.session.user = data.email;
      req.session.name = data.name;
      req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
      let resMsg;
      if (req.session.user === "admin@fox.com") {
        req.session.auth = "admin";
        resMsg = "admin";
      } else {
        req.session.auth = true;
        resMsg = "ok";
      }
      req.session._id = newUser._id;
      await req.session.save();
      res.json({ "msg": resMsg, 'user': req.session.user, 'name': req.session.name, '_id': newUser._id });

    })
  }

  async createLoginRoute() {
    this.app.post('/user/login', async (req, res) => {
      let err;
      req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
      req.session.save();


      // Check for admin auth, if set just redirect to admin page on clientside
      if (req.session.auth === "admin") {
        let user = await this.User.findOne({ email: req.session.user }).catch(error => err = error);
        if (err) {
          res.json({ err });
          return;
        }
        res.json({ 'msg': 'admin', 'user': req.session.user, 'xtrazz': 'Hot damn! This is the daddy of them all!', 'name': req.session.name, '_id': user._id });
        return;
      }

      // before ANYTHING else, let's see if this person is already logged in, in that case all is well already
      if (req.session.auth === true) {
        let user = await this.User.findOne({ email: req.session.user }).catch(error => err = error);
        if (err) {
          res.json({ err });
          return;
        }
        res.json({ 'msg': 'ok', 'user': req.session.user, 'xtrazz': 'Hot damn! User was already logged in :D', 'name': req.session.name, '_id': user._id });
        return;
      }

      let data = req.body;
      // Leaving this here because peepz could use postman even if clientside validation does not allow posts with uncomplete forms
      if (!data.password || !data.email) {
        res.json({ 'msg': 'error', 'xtras': 'missing email or pwd' });
        return;
      }

      let user = await this.User.findOne({ email: data.email }).catch(
        error => err = error
      );

      if (user === null) {
        res.json({ 'msg': 'goregister' });
        return;
      }

      let match = await bcrypt.compare(data.password + passwordSalt, user.password);
      if (match) {
        let resMsg;
        req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
        req.session.user = data.email;
        req.session.name = user.name;
        req.session._id = user._id;
        if (req.session.user === "admin@fox.com") {
          req.session.auth = "admin";
          resMsg = "admin";
        } else {
          req.session.auth = true;
          resMsg = "ok";
        }
        await req.session.save();
        res.json({ 'msg': resMsg, 'user': req.session.user, 'name': req.session.name, '_id': user._id });
      } else {
        res.json({ 'msg': 'badpass' });
      }

    });
  }

  createLogoutRoute() {
    this.app.post('/user/logout', async (req, res) => {
      req.session.destroy(function () {
        res.json({ 'msg': 'ok', 'xtrazz': 'This mofo is goooone baby!' });
      })
    })
  }

}