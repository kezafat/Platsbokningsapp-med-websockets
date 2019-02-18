 class MovieDetailContainer extends Component  {

  constructor() {
    super();
    this.addRoute('/film', 'film'); //film/(.*)/);
    this.fetchMovieDetail();
    this.movieDetailFetched = false;
  }


  async fetchMovieDetail() {
    let urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('film');
    // if the showid is null we don't have a show to set :()
    if (movieId === null) { return }
    let movie = await Movie.find(movieId);
    console.log(movie);
    //document.title = 'Film: ' + movie.title;
    this.movieDetail = new MovieDetail(movie._props);
    this.movieDetailFetched = true;
    this.render();

  }
  mount() {
    this.fetchMovieDetail();
  }

  unmount(){
    this.movieDetailFetched = false;
  }
 }
