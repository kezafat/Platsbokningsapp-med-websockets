import React, { Component } from "react";
import { Spinner, Row, Col } from "reactstrap";
import Day from "./Day";

class Shows extends Component {
  constructor(props) {
    super(props);
    // this.state = { allShows: false, fetched: false };
    this.days = [];
    this.allShows = [];
    this.fetchShows();
    this.state = {
      loaded: false,
    }
  }

  async fetchShows() {
    let now = new Date().toISOString().split("T");
    let currentDate = (this.currentDate = now[0]);
    let currentTime = now[1]
      .split(":")
      .slice(0, 2)
      .join(":");
    this.allShows = await fetch("http://localhost:3000/json/shows/");
    this.allShows = await this.allShows.json();
    this.allShows = this.allShows.filter(show => {
      if (show.date > currentDate) {
        return true;
      } else if (show.date === currentDate && show.time > currentTime) {
        return true;
      } else {
        return false;
      }
    });

    this.allShows.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else if (a.time < b.time) {
        return -1;
      } else if (a.time > b.time) {
        return 1;
      } else {
        return 0;
      }
    });
    if (this.allShows.length === 0) {
      return;
    } else {
      this.allShows.length = 21;
    }

    let firstDate = this.allShows[0].date;
    this.days = [{ date: firstDate, shows: [] }];
    for (let show of this.allShows) {
      if(!show) { continue }
      // create a day with the same date as the first show
      let currentDay = this.days[this.days.length - 1];
      // if the date of the show isn't the current day
      // create a new day
      if (show.date !== currentDay.date) {
        currentDay = { date: show.date, shows: [] };
        this.days.push(currentDay);
      }
      // add the show to the current day object
      currentDay.shows.push(show);
    }

    // render method
    this.setState({ loaded:true });
  }

  render() {
   let markUp = () => (
       <section className="movies-schedule-page">
         <Row>
           <Col>
             <h2 className="mb-3">Filmvisningar</h2>
           </Col>
         </Row>
         <div className="date">
           {this.days.map((day, index) => (
             <Day key={index} show={day} />
           ))}
         </div>
       </section>
     )
    return (
     this.state.loaded ? markUp() : <Spinner />
   )

  }
}

export default Shows;
