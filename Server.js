const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sass = require('./sass');
const config = require('./config.json');
const connectionString = require('./connectionString.js');
const CreateRestRoutes = require('./CreateRestRoutes');

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

    // Set keys to names of rest routes
    const models = {
      // books: require('./Book'),
      // authors: require('./Author')
    };

    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);



    const fs = require('fs');
    const path = require('path');

    // Automatically load all scripts at root level of js folder
    // and load their corresponding template files
    app.get('/autoload-js-and-templates', (req, res) => {
      let files = fs.readdirSync(path.join(__dirname, '/www/js'));
      files = files.filter(x => x.substr(-3) === '.js')
      let html = files.map(x => `<script src="/js/${x}"></script>`).join('');
      html += files.filter(x => fs.existsSync(path.join(
        __dirname, '/www/templates', x.split('.js').join('.html')
      ))).map(x => `<script src="/template-to-js/${
        x.split('.js').join('.html')}"></script>`).join('');
      res.send(`document.write('${html}')`);
    });

    // Convert a template to a js render method
    app.get('/template-to-js/:template', (req, res) => {
      let html = fs.readFileSync(path.join(
        __dirname, '/www/templates', req.params.template));
      html = req.params.template.split('.html')[0] +
        '.prototype.render = function(){ return `\n' + html + '\n`};'
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



