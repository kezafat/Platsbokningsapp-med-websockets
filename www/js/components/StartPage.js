
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
      html += `
      <div class="col-12 col-sm-6 col-md-4 p-0">
      <div class="card h-100 mb-2 mx-1">
       <img class="img-thumbnail img-fluid" src="images/${movie.images[0]}" alt="movie-posters">
       <div class="card-body p-2">
        <h5 class="card-title mb-1 font-weight-light text-light">${movie.title}</h5><br>
        <p class="card-text font-weight-light text-light">${movie.genre} ${movie.productionYear}<br>${movie.director}
       </p>
        <a href="/mitt-konto" class="btn btn-outline-warning font-weight-light" role="button">Konto</a>
        <a href="/movies-schedule-page" class="btn btn-outline-warning font-weight-light" role="button">Visningar</a>
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
      <li class="aside-text font-weight-light">${show.date} kl. ${show.time} <br> ${show.movie.title} ${show.auditorium.name}</li>
      </ul>`
    }
    this.upcomingShowsHTML = html;
    this.render();
  }
}

$('.carousel').carousel({
  interval: 1500
});


