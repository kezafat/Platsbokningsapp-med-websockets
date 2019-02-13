class MoviePage extends Component {
  
  constructor(){
  super();
    this.addRoute('/filmer', 'Filmer');
    this.movies = [];
    this.getMovies();
  }
  async getMovies(){
    this.movies = await Movie.find();
    

    this.render();
  }
}