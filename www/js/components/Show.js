class Show extends Component {

  constructor(props){
    super(props);
    // convert raw js object this.movie to a real instance of Movie
    this.movie = new Movie(this.movie);
    this.auditorium = new Auditorium(this.auditorium);
    this.addEvents({
      'click button': 'emitShowSelectedEvent'
    });
  }

  emitShowSelectedEvent() {
    const event = new CustomEvent('showSelected', {
      detail: {show: this},
      bubbles: true
    });
    this.baseEl[0].dispatchEvent(event);
  }
}