const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sass = require('./sass');
const config = require('./config.json');
const connectionString = require('./connectionString.js');
const CreateRestRoutes = require('./CreateRestRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

for (let conf of config.sass) {
  new Sass(conf);
}

module.exports = class Server {

  constructor() {
    this.start();
  }

  async start() {
    console.log(await this.connectToDb());
    await this.startWebServer();
  }

  connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, { useNewUrlParser: true });
      global.db = mongoose.connection;
      db.on('error', () => reject('Could not connect to DB'));
      db.once('open', () => resolve('Connected to DB'));
    });
  }

  startWebServer() {

    // Create a web server
    const app = express();

    // Add body-parser to our requests
    app.use(bodyParser.json());

    // Serve static files from www
    app.use(express.static('www'));

    // Add session (and cookie) handling to Express
    app.use(session({
      secret: "secretsAreForPussies(cats)",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: db
      })
    }));

    // Set keys to names of rest routes
    const models = {
      movies: require('./schemas/Movie'),
      auditoria: require('./schemas/Auditorium'),
      bookings: require('./schemas/Booking'),
      shows: require('./schemas/Show'),
      users: require('./schemas/User'),
    };

    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);



    const fs = require('fs');
    const path = require('path');

    // Automatically load all scripts at root level of js/components folder
    // and load their corresponding template files
    app.get('/autoload-js-and-templates', (req, res) => {
      // get all files in components directory
      let files = fs.readdirSync(path.join(__dirname, '/www/js/components'));
      // filter out files that don't end with .js
      files = files.filter(x => x.substr(-3) === '.js')
      // create html tags that load the js files
      let html = files.map(x => `<script src="/js/components/${x}"></script>`).join('');
      // filter out js files that don't have a .html template
      // and make it load the corresponding template
      html += files.filter(x => fs.existsSync(path.join(
        __dirname, '/www/templates', x.split('.js').join('.html')
      ))).map(x => `<script src="/template-to-js/${
        // call the route for the template, with .html instead of .js ending
        x.split('.js').join('.html')}"></script>`).join('');
      // write the results in the html body        
      res.send(`document.write('${html}')`);
    });

    // Convert a template to a js render method
    app.get('/template-to-js/:template', (req, res) => {
      let html = fs.readFileSync(path.join(
        __dirname, '/www/templates', req.params.template));
      // add render method to the name of the component that returns the content of the html file
      html = req.params.template.split('.html')[0] +
        '.prototype.render = function(){ return `\n' + html + '\n`};'
      // respond with the render function
      res.send(html);
    });

    // Serve the index page everywhere so that the
    // frontend router can decide what to do
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/www/index.html'));
    });

    // Start the web server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

}



