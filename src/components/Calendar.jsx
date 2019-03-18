import React, { Component } from 'react';
import { Row } from 'reactstrap';

class Calendar extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/json/shows/`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    const now = new Date().toISOString().split('T');
    const currentDate = now[0];
    const currentTime = now[1];
    return (<Row className="shows-calendar mx-2 mt-2 rounded">
      <div className="text-center ml-2 mb-2">
        <h2>Kalendarium</h2>
      </div>
      <div>
        <div className="calender-wrapper">
          {this.state.data.filter(show => {
            if (show.date === currentDate) {
              return true
            } else if (show.date >= currentDate && show.time > currentTime) {
              return true
            } else {
              return false
            }
          }).sort((
            function (a, b) {
              if (a.date < b.date) { return -1 }
              else if (a.date > b.date) { return 1 }
              else if (a.time < b.time) { return -1 }
              else if (a.time > b.time) { return 1 }
              else {
                return 0;
              }
            })).slice(0, 10).map((show) => (
              <p key={show._id}>{show.date} &nbsp; <strong>kl.</strong> &nbsp;{show.time}<br />
                {show.movie.title}</p>
            ))}
        </div>
      </div>
    </Row>
    )
  }
}
export default Calendar

