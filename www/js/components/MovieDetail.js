class MovieDetail extends Component {

  constructor(props){
    super(props);
    this.addRoute(/\/filmer\/(.*)/);//film/(.*)/);
    console.log('hi');

  }

 mount(){
   console.log('moviedetail');
 }

  // async mount(){
    
  //   let id = this.routeParts[0];
  //   let movie = await Movie.find(id);
  //   document.title = 'Film: ' + movie.title;
  //   Object.assign(this, movie._props);
  //   this.render();
  // }
}