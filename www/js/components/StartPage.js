
class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Startsida');
    this.movies = [];
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
      html += `<div class="row mx-0">
      <div class="card">
       <img class="img-thumbnail img-fluid" src="images/${movie.images[0]}" alt="movie-posters">
       <div class="card-body pb-2">
        <h5 class="card-title">${movie.title}</h5><br>
        <p class="card-text">${movie.genre}  ${movie.productionYear}</p><br>
        <p class="card-text">${movie.director}</p>
        <a href="/mitt-konto" class="btn btn-outline-warning text-dark" role="button">Konto</a>
        <a href="/movies-schedule-page" class="btn btn-outline-warning text-dark" role="button">Visningar</a>
      </div> 
      </div>
      </div>
      `
    }
    this.moviesHtml = html;
    this.render();
    //return 'html';
  }

  async upcomingShows() {
    this.shows = await Show.find();
    this.showUpcomingShowsHTML();
  }

  showUpcomingShowsHTML() {
    const shows = this.shows.slice(0, 10);
    let html = '';
    for (let show of shows) {
      html += `<ul class="text-light">Datum
      <li>${show.date} kl. ${show.time} <br> ${show.movie.title} & ${show.auditorium.name}</li>
      </ul>`
    }
    this.upcomingShowsHTML = html;
    this.render();
  }

}

$('.carousel').carousel({
  interval: 1500
})


