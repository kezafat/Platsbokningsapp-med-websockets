
class StartPage extends Component {

  constructor(show, movieSchedulePage) {
    super();
    this.addRoute('/', 'Startsida');
    this.movies = [];
    this.show = show;
    this.movieSchedulePage = movieSchedulePage;
    this.moviesHtml = 'loading';
    this.getMovies();
    this.getShows();
    this.showsHtml = '';
  }
  async getMovies() {
    this.movies = await Movie.find();
    //console.log(this.movies)
    this.createMoviesHtml()
  }
  createMoviesHtml() {
    let html = '';
    for (let movie of this.movies) {
      html += `
      <div class="card">
       <img class= "card-img-top img-thumbnail" src="images/${movie.images[0]}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5><br>
        <p class="card-text">${movie.genre} ${movie.productionYear}<br>${movie.director}</p>
        <button href="/mitt-konto" class="btn btn-warning startbtn">Konto</button>
        <button href="/movie-schedule-page" class="btn btn-warning startbtn">Visningar</button>
      </div>
      </div>
        `
    }
    this.moviesHtml = html;
    this.render();
    //return 'html';
  }

  async getShows() {
    let id = this.id
    let movie = this.movie;
    let auditorium = this.auditorium;
    this.shows = await Show.find(id, movie, auditorium);
    //console.log(this.shows);
    this.showCurrentShows();
  }

  showCurrentShows() {
    let html = '';
    // let currentDate = new Date().toISOString().split('T')[0];
    // let showDate = show[0].currentDate
    for (let show of this.shows) {
      html += `
      <ul>Datum
       <li> ${show.date} kl. ${show.time}<br>${show.movie.title}</li>

      </ul>
      `
    }
    this.showsHtml = html;
    this.render();
  }
}

$('.carousel').carousel({
  interval: 1000
})