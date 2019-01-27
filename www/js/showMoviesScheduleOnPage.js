
const mongoose = require('mongoose');

console.log('hu');
// Connect to db
let dbName = 'Benedictus'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
//const Show = require('./Show');
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  movieSchedulePopulate();
});

// async function movieSchedulePopulate() {
//   let movies = await Show.find({});

//   let populatedMovies = await Movies
//     .find({})
//     .populate('movies', 'description time date')
//     .exec();
//   console.log(movies, JSON.stringify(populatedMovies, null, ''));
// }
// // A route that returns all movies from Mongo
// app.get('/js/model/show', async (req, res) => {
//   let shows = await Show.find();
//   res.js(shows);
// });

// process.exit();

displayAllMovies();

async function displayAllMovies() {
  let movies = await Movies.find();

  $('.movie-list').empty();
  console.log('data-id')

  for (let movie of movies) {
    $('.show-movie').append(`
      <div class="movie">
        <h2>${movie.title}</h2>
        <h3>${movie.date}</h3>
        <p>${movie.time}</p>
        <img src="/movie-images/${movie.image}">
      </div>      
    `);
    console.log(movies)
  }
}
