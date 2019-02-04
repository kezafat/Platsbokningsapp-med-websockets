const bcrypt = require('bcryptjs');

module.exports = class LoginHandler {

  constructor(app, User) {
    this.app = app;
    this.User = User;
    this.createLoginRoute();
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
        res.json({ 'msg': 'login' });
        return;
      }

      if (!data.password) {
        res.json({ 'msg': 'error, no password' });
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
        res.json({ 'msg': "error" });
      } else {
        // Since all went well, also store some data in users session.
        req.session.user = data.email;
        req.session.name = data.name;
        req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
        req.session.auth = true;
        req.session._id = newUser._id;
        await req.session.save();
        res.json({ "msg": "ok", 'user': req.session.user, 'name': req.session.name, '_id': newUser._id });
      }
    })
  }

  async createLoginRoute() {
    this.app.post('/login', async (req, res) => {
      let err;
      req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
      req.session.save();
      // before ANYTHING else, let's see if this person is already logged in, in that case all is well already
      if (req.session.auth === true) {
        let user = await this.User.findOne({ email: req.session.user }).catch(error => err = error);
        res.json({ 'msg': 'ok', 'user': req.session.user, 'xtrazz': 'Hot damn! User was already logged in :D', 'name': req.session.name, '_id': user._id });
        return;
      }

      let data = req.body;
      if (!data.password || !data.email) {
        res.json({ 'msg': 'error' });
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
        req.session.auth = true;
        req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
        req.session.user = data.email;
        req.session.name = user.name;
        req.session._id = user._id;
        await req.session.save();
        res.json({ 'msg': 'ok', 'user': req.session.user, 'name': req.session.name, '_id': user._id });
      } else {
        res.json({ 'msg': 'badpass' });
      }

    });
  }

  createLogoutRoute() {
    this.app.post('/logout', async (req, res) => {
      req.session.auth = false;
      await req.session.save();

      if (req.session.auth === false) {
        res.json({ 'msg': 'ok', 'extra': 'uz been logged out bizzle' })
      } else {
        res.json({ 'msg': 'error' });
      }

    })
  }

}