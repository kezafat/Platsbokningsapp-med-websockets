//this one is temporary so to see the result in the console
let tmp = [];

//create a function to generate at least 84 movie viewings
async function generatesShows() {

  let movies = await Movie.find();
  let auditoriums = await Auditorium.find();

  //create copies of movies and audirtoriums array
  let moviesArr = movies.slice();
  let auditoriumsArr = auditoriums.slice();

  //creating a day counter that adds one every 3rd viewing 
  let dayCounter = 0;
  for (let i = 0; i < 90; i++) {
    let dayAsMillis = 24 * 60 * 60 * 1000;
    if (i % 3 === 0) {
      dayCounter++;
      //create new copies of movies and audirtoriums array so to fill them again
      moviesArr = movies.slice();
      auditoriumsArr = auditoriums.slice();
    }

    //randomise hrs starting at 17:00 and mins for every half and whole hr  
    let hrRandom = Math.floor(Math.random() * 3);
    let minRandom = (Math.round(Math.random()) * 3)
    //creating a 24hr period and getting current year, month, day to send them into a loop
    let day = new Date(Date.now() + dayAsMillis * dayCounter);
    let month = day.getMonth() + 1;
    let dayOfShow = day.getDate();
    //adding a 0 before every month less then 10
    if (month < 10) {
      month = '0' + month;
    }
    //adding a 0 before every day less then 10
    if (dayOfShow < 10) {
      dayOfShow = '0' + dayOfShow;
    }
    //removing the random choice with .pop()
    let show = new Show({
      "movie": shuffle(moviesArr).pop(),
      "auditorium": shuffle(auditoriumsArr).pop(),
      "time": 17 + hrRandom + ':' + minRandom + '0',
      "date": day.getFullYear() + '-' + month + '-' + dayOfShow,
      "bookings": []
    });

    //shuffeling the movies and randomising
    function shuffle(movies) {
      for (let i = moviesArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = moviesArr[i];
        moviesArr[i] = moviesArr[j];
        moviesArr[j] = temp;
      }
      return movies;
    }
    //shuffeling the auditoriums and randomising
    function audiShuffle(auditoriums) {
      for (let i = auditoriumsArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = auditoriumsArr[i];
        auditoriumsArr[i] = auditoriumsArr[j];
        auditoriumsArr[j] = temp;
      }
      return auditoriums;
    }

    tmp.push(show);
    //await show.save()
  }
  shuffle();
  audiShuffle();
}
generatesShows();
console.log(tmp);