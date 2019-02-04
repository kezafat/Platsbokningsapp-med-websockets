class Show extends Component {

  constructor(props){
    super(props);
    // convert raw js object this.movie to a real instance of Movie
    this.movie = new Movie(this.movie);
    this.auditorium = new Auditorium(this.auditorium);
  }
}