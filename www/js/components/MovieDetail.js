class MovieDetail extends Component {

  constructor(movie) {
    super();
    this.movie = movie;
    this.movieTimes = "";
    this.actorsList = "";
    this.getAllDates();
    this.getActorList();
  }

  getActorList(){
    let actorsList = "";
    for(let actor of this.movie.actors) {
      this.actorsList += `<li>${actor}</li>`;
      console.log(actor);
    }
    actorsList += '</ul>'
    return actorsList;
  }


  getAllDates() {
    let i = 0; 
    for (let show of this.movie.shows) {
      // console.log(show);
      // console.log(this.movie);

      this.movieTimes += `<p>${show.date}</p>`
      this.movieTimes += `<p>kl ${show.time}</p>`
      this.movieTimes += `<p>i ${show.auditorium.name} </p><hr>`
      i++;
      if(i == 5){ break; }
     
    }

    this.render();
  }
}