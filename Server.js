const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectionString = require('./connectionString.js');
const CreateRestRoutes = require('./CreateRestRoutes');
const LoginHandler = require('./LoginHandler');
const settings = require('./settings.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const SocketIoController = require('./SocketIoController');


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
      global.passwordSalt = settings.passwordSalt;
      db.on('error', () => reject('Could not connect to DB'));
      db.once('open', () => resolve('Connected to DB'));
    });
  }

  startWebServer() {

    // Create a web server
    const app = express();

    // Add body-parser to our requests
    app.use(bodyParser.json());


    // Add session (and cookie) handling to Express
    app.use(session({
      secret: "secretsAreForPussies(cats)",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: db,
        collection: "tmpsess"
      })
    }));


    // Set keys to names of rest routes
    const models = {
      movies: require('./schemas/Movie'),
      auditoria: require('./schemas/Auditorium'),
      bookings: require('./schemas/Booking'),
      shows: require('./schemas/Show'),
    };

    global.models = models;

    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);

    // create special extra routes for login
    new LoginHandler(app, db, require('./schemas/User'));

    // Start the web server
    const server = http.Server(app);
    server.listen(3001, () => console.log('Listening on port 3000'));

    new SocketIoController(server);
  }

}



