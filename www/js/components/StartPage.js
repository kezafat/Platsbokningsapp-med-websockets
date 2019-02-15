
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
    //console.log(this.movies)
    this.createMoviesHtml()
  }
  createMoviesHtml() {
    let html = '';
    for (let movie of this.movies) {
      console.log(movie.genre);
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

  async getShows() {
    let id = this.id
    let movie = this.movie;
    let auditorium = this.auditorium;
    this.shows = await Show.find(id, movie, auditorium);
    //console.log(this.shows); 
    console.log(this.shows)
    this.showUpcomingShowsHTML();
  }

  showUpcomingShowsHTML() {
    let html = '';
    for (let show of this.shows) {
      console.log(show.movie);
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

