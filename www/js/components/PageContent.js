class PageContent extends Component {
  constructor() {
    super();

    this.shows = [];
    // Först kan du ladda hem alla filmer o lagra dessa i instansens "this.shows"
    // I själva templaten kallas sedan generateShowsList som loopar igenom innehållet i instansens "this.shows" och spottar ut det du vill
    // du får köra populate på din request, jag visar dig bara hur frontend funkar här och har raderat alla dina filer som inte ska ligga här
    this.fetchShows();
  }

  // DENNA KÖRS VID INSTANSIERING OCH LADDAR IN ALLT ASYNKRONT
  async fetchShows() {
    const shows = await fetch('http://localhost:3000/json/shows', {
      method: 'GET'
    });
    this.shows = await shows.json();
    this.render()
  }

  // DENNA KALLAS FRÅN TEMPLATEN OCH HAR REDAN FÄRDIG DATA ATT BEHANDLA OCH SPOTTA UT
  generateShowsList() {
    let html = '';
    for (let show of this.shows) {
      html += `<h4>${show.date} kl. ${show.time} i ${show.auditorium} (detta är auditorium och behöver populatas)</h4>`
      html += `<hr>Sedan kan du lägga till mer html för att få ut mer info`;
    }
    return html

  }
}