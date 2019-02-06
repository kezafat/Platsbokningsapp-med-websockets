class MoviesSchedulePage extends Component {

  constructor( ) {
    super();
    this.addRoute('/movies-schedule-page', 'Film Visningar');
    this.days = [];
    this.fetchMovies();
  }
  
  //runs when instanciating and loads everything asyncronous
  async fetchMovies() {
    let now = new Date().toISOString().split('T');
    let currentDate = now[0];
    let currentTime = now[1].split(':').slice(0,2).join(':');
    let allShows = await Show.find(`.find({ date: { $gte: '${currentDate}' } }).populate('auditorium movie bookings')`);
    if(allShows.length === 0){ return; }
    let firstDate = allShows[0].date;
    // create a day with the same date as the first show
    this.days = [new Day({date: firstDate})];
    for(let show of allShows){
      let currentDay = this.days[this.days.length - 1];
      // if the date of the show isn't the current day
      // create a new day
      if(show.date !== currentDay.date){
        currentDay = new Day({date: show.date});
        this.days.push(currentDay);
      }
      // add the show to the current day object
      currentDay.shows.push(show);
    }
    this.render();
  }
}


