//let tmp = [];
async function generatesShows() {

  let movies = await Movie.find();
  let auditoriums = await Auditorium.find();

  let moviesArr = movies.slice();
  let auditoriumsArr = auditoriums.slice();


  let dayCounter = 0;
  for (let i = 0; i < 90; i++) {
    let dayAsMillis = 24 * 60 * 60 * 1000;
    if (i % 3 === 0) {
      dayCounter++;
      moviesArr = movies.slice();
      auditoriumsArr = auditoriums.slice();
    }

    //let movieRandom = Math.floor(Math.random() * moviesArr.length);
    //let auditoriumRandom = Math.floor(Math.random() * auditoriumsArr.length);
    let hrRandom = Math.floor(Math.random() * 3);
    let minRandom = (Math.round(Math.random()) * 3)
    let day = new Date(Date.now() + dayAsMillis * dayCounter);
    let month = day.getMonth() + 1;
    let dayOfShow = day.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (dayOfShow < 10) {
      dayOfShow = '0' + dayOfShow;
    }

    let show = new Show({
      "movie": shuffle(moviesArr).pop(),
      "auditorium": shuffle(auditoriumsArr).pop(),
      "time": 17 + hrRandom + ':' + minRandom + '0',
      "date": day.getFullYear() + '-' + month + '-' + dayOfShow,
      "bookings": []
    });

    function shuffle(movies) {
      for (let i = moviesArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = moviesArr[i];
        moviesArr[i] = moviesArr[j];
        moviesArr[j] = temp;
      }
      return movies;
    }
    
    function audiShuffle(auditoriums) {
      for (let i = auditoriumsArr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = auditoriumsArr[i];
          auditoriumsArr[i] = auditoriumsArr[j];
          auditoriumsArr[j] = temp;
      }
      return auditoriums;
     }

    // tmp.push(show);
    await show.save()
  }
  shuffle();
  audiShuffle();
}

generatesShows();
// console.log(tmp);

