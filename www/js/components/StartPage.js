
class StartPage extends Component {

  constructor(show) {
    super();
    this.addRoute('/', 'Startsida');
    this.movies = [];
    this.shows = [];
    this.moviesHtml = 'loading';
    this.getMovies();
    this.upcomingShows = show;
    this.getShows();
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
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${movie.title}</h5><br>
        <p class="card-text">${movie.genre}</p>
        <p> ${movie.productionYear}<br> ${movie.director}</p>
        <a href="/visningar" class="btn btn-outline-danger mt-auto" role="button">Visningar</a>
      </div> 
      </div>
      `
    }
    this.moviesHtml = html;
    this.render();
    //return 'html';
  }

  async getShows(show) {
    let id = this.id;
    let movie = this.movie;
    let auditorium = this.auditorium;
    this.shows = await Show.find(id, movie, auditorium);
    this.showUpcomingShowsHTML();
  }

  showUpcomingShowsHTML() {
    let html = '';
    for (let show of this.shows) {
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

