class MoviesSchedule extends Component {
  constructor() {
    super();

    this.addRoute('/movies-schedule', 'Film Visningar');

    this.shows = [];
    this.fetchShows();
  }

  //Först kan du ladda hem alla filmer o lagra dessa i instansens "this.shows"
  //I själva templaten kallas sedan generateShowsList som loopar igenom innehållet i 
  //instansens "this.shows" och spottar ut det du vill    
  //du får köra populate på din request, jag visar dig bara hur frontend funkar här 
  //och har raderat alla dina filer som inte ska ligga här


  //runs when instanciating and loads everything asyncronous
  async fetchShows() {
    //this.shows = await Show.find(`.find({ date: { $gte: Date.now() }} ).populate('auditorium').populate('movie')`);
    this.shows = await Show.find(`.find().populate('auditorium').populate('movie')`);
    this.render()
  }

  //this one is called from the template and contains already complete data to return
  generateShowsList() {
    let html = '';
    for (let show of this.shows) {
      html +=
       ` <h4>${show.movie.title}</h4><br>
          <p> den ${show.date}</p><br>
          <p>kl.${show.time}</p><br> 
          <p>i ${show.auditorium.name}</p> 
          <a href="#" class="btn btn-info btn-sm active" role="button" aria-pressed="true">Info</a>
          <a href="#" class="btn btn-light btn-sm active" role="button" aria-pressed="true">Biljetter</a>
         <hr>`;
    }
    return html
  }
}

