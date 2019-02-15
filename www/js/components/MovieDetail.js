class MovieDetail extends Component {

  constructor(props){
    super(props);
    this.addRoute('/film');//film/(.*)/);
    console.log('hi');

  }


  
  
  async mount(){
    console.log('moviedetail');
    console.log(movie);

     let id = this.routeParts[0];
     let movie = await Movie.find(id);
     document.title = 'Film: ' + movie.title;
     Object.assign(this, movie._props);
     this.render();
   }
}