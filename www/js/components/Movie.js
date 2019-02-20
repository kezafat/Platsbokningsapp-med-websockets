class Movie extends Component {

  constructor(props) {
    super(props);
    this.sortMovieShows();
    
    
  }
  sortMovieShows() {
    function compare(a, b) {
      if (a.date < b.date) {
        //if a is an earlier date
        return -1;
      } else if (a.date > b.date) {
        //if a is a later date
        return 1;
      } else {
        //if a and b are same date sort by time
        if (a.time < b.time) {
          return -1;
        } else if (a.time > b.time) {
          return 1;
        } else {
          //if same time and same date
          return 0;
        }
      }
    }
  

    //get date of the day and cut it off at the 'T'
    let now = new Date().toISOString().split('T');
    //set time format and add current date to first movie viewing
    let currentDate = now[0];
    let currentTime = now[1].split(':').slice(0, 2).join(':');
    let result = this.shows.sort(compare).filter(show => {
      if (show.date > currentDate) {
        return true
      } else if (show.date === currentDate && show.time > currentTime) {
        return true
      } else {
        return false
      }
    });
    this.shows = result;
  }

  //movie has an array of shows
  get nextShow() {
    return this.shows[0];
  }
}
