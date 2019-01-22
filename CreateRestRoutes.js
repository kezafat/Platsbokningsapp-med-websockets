module.exports = class CreateRestRoutes {

  constructor(app, db, models){
    this.app = app;
    this.db = db;
    // loop through models and create routes
    for(let key in models){
      this.createRoutes(key, models[key]);
    }
  }

  createRoutes(baseRoute, Model){

    baseRoute = '/json/' + baseRoute + '/';

    // create a new instance
    this.app.post(baseRoute, async (req, res) => {
      let err, instance = new Model(req.body);
      let result = await instance.save().catch(
        error => err = error
      )
      res.json(err || result);
    });

    // read all instances
    this.app.get(baseRoute, async (req, res) => {
      res.json(await Model.find());
    });

    // advanced search/find route
    this.app.get(baseRoute + '.*', async (req, res) => {
      let query = decodeURIComponent(
        req.url.substr(req.url.indexOf('/.') + 1)
      );
      if(query.indexOf('.find') !== 0){
        // To prevent update and remove questions
        res.json({error: 'The query must start with .find'});
        return;
      }
      // prevent Elias injection
      if(query.indexOf('.catch') >= 0){
        res.json({error: 'Nice try!'});
        return;
      }
      let func = new Function('model','return model' + query);
      let result;
      try {
        result = await func(Model);
      }
      catch(error){
        result = {error: error + ''};
      }
      res.json(result);
    });

    // read instance by id
    this.app.get(baseRoute + ':id', async(req, res) => {
      let err, result = await Model.findById(req.params.id).catch(
        error => err = error
      );
      res.json(err || result);
    });

    // update/change instance by id
    this.app.put(baseRoute + ':id', async (req,res) => {
      let result;
      try {
        let instance = await Model.findById(req.params.id);
        Object.assign(instance, req.body);
        result = await instance.save();
      }
      catch(error){
        result = {error: error + ''}
      }
      res.json(result);
    });

    // delete instance by id
    this.app.delete(baseRoute + ':id', async (req,res) => {
      let err, result = await Model.findByIdAndRemove(req.params.id).catch(
        error => err = error
      );
      res.json(err || result);
    });

  }

}