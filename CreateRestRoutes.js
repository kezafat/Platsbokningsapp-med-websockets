const shorthash = require("shorthash");
module.exports = class CreateRestRoutes {

  constructor(app, db, models) {
    this.app = app;
    this.db = db;
    // loop through models and create routes
    for (let key in models) {
      this.createRoutes(key, models[key]);
    }
  }

  createRoutes(baseRoute, Model) {

    baseRoute = '/json/' + baseRoute + '/';

    // create a new instance
    this.app.post(baseRoute, async (req, res) => {
      if (req.session.auth !== "admin") {
        res.json({ get: "the fuck out :D" });
        return;
      }
      let err, instance = new Model(req.body);
      // naughty little if statement to add the users id if creating a booking
      if (Model.modelName === 'Booking') {
        instance.user = req.session._id;
        let dateString = Date.now() + " ";
        instance.ticketID = await shorthash.unique(dateString);
      }
      let result = await instance.save().catch(
        error => err = error
      )
      res.json(err || result);
    });

    // read all instances
    this.app.get(baseRoute, async (req, res) => {
      res.json(await Model.find());
    });

    // just going to leave this here (this is one way to hack the old "custom route")
    // http://localhost:3000/json/auditoria/.find()&&function()%7Bconst%20d%20=%20global.db.base.connections[0];return%20JSON.stringify(d.hosts)+JSON.stringify(d.user)+JSON.stringify(d.pass)%7D()

    // read instance by id
    this.app.get(baseRoute + 'id/:id', async (req, res) => {
      let err, result = await Model.findById(req.params.id).catch(
        error => err = error
      );
      res.json(err || result);
    });

    // update/change instance by id
    this.app.put(baseRoute + ':id', async (req, res) => {
      if (req.session.auth !== "admin") {
        res.json({ get: "the fuck out :D" });
        return;
      }
      let result;
      try {
        let instance = await Model.findById(req.params.id);
        Object.assign(instance, req.body);
        result = await instance.save();
      }
      catch (error) {
        result = { error: error + '' }
      }
      res.json(result);
    });

    // delete instance by id
    this.app.delete(baseRoute + ':id', async (req, res) => {
      if (req.session.auth !== "admin") {
        res.json({ get: "the fuck out :D" });
        return;
      }
      let err, result = await Model.findByIdAndRemove(req.params.id).catch(
        error => err = error
      );
      res.json(err || result);
    });

  }

}