
class StartPage extends Component {

  constructor(auditorium, movie) {
    super();
    this.addRoute('/', 'Startsida');
    this.movies = [];
    this.shows = [];
    this.moviesHtml = 'loading';
    this.getMovies();
    this.upcomingShows();
    this.upcomingShowsHTML = '';
  }


  async getMovies() {
    this.movies = await Movie.find();
    this.createMoviesHtml()
  }
  createMoviesHtml() {
    let html = '';
    for (let movie of this.movies) {
      html += `
      <div class="card">
       <img class= "card-img-top img-thumbnail" src="images/${movie.images[0]}" alt="movie-posters">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5><br>
        <p class="card-text">${movie.genre}</p>
        <p> ${movie.productionYear}<br> ${movie.director}</p>
        <a href="/mitt-konto" class="btn btn-warning startbtn" role="button">Konto</a>
        <a href="/movies-schedule-page" class="btn btn-warning startbtn" role="button">Visningar</a>
      </div> 
      </div>
      `
    }
    this.moviesHtml = html;
    this.render();
    //return 'html';
  }

  async upcomingShows() {
    let id = this.id;
    let movie = this.movie;
    let auditorium = this.auditorium;
    // What is this supposed to do? This is not a valid query, check backend.
    // this.shows = await Show.find(id, movie, auditorium);
    this.shows = await Show.find();
    this.showUpcomingShowsHTML();
  }

  showUpcomingShowsHTML() {
    const shows = this.shows.slice(0, 7);
    let html = '';
    for (let show of shows) {
      html += `<ul> Datum
      <li> ${show.date} kl.${show.time}<br>${show.movie.title} ${show.auditorium.name}</li >
     </ul>`
    }
    this.upcomingShowsHTML = html;
    this.render();
  }

}

$('.carousel').carousel({
  interval: 1500
})


