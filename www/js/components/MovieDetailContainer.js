// class MovieDetailContainer extends Component  {
//   constructor(){
//     super();
//     this.addRoute('/film', 'film-info');
//     his.movieDetailFetched = false;
//     console.log('movieDetail');

//   }
//   async setSelectedMovie() {
//     console.log(movie);
//     let urlParams = new URLSearchParams(window.location.search);
//     let id = urlParams.get('movie');
//     // if the showid is null we don't have a show to set :()
//     if (id === null) { return }
//     //let show = await Show.find(showId);
//     let movie = await Movie.find(id);
//    // document.title = 'Film: ' + show.title;
//     document.title = 'Film: ' + movie.title;
//     Object.assign(this, movie._props);
    
//     this.movieDetailFetched = true;
//     this.render();

//     console.log(show);
//   }

//   mount() {
//     this.setSelectedMovie();
//   }

//   unmount() {
//     this.movieDetailFetched = false;
//   }
// }