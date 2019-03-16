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
    return (
      <Row className="shows-calendar mx-2 ounded">
        <div className="calender-wrapper">
          <div>
            <h2 className="text-center">Kalendarium</h2>
          </div>
          <div className="text-center ml-2 mb-2">
            {this.state.data.slice(1, 12).sort().map((show, _id) => (
              <p key={_id}>{show.date} &nbsp; <strong>kl.</strong> &nbsp;{show.time}<br />
                {show.movie.title}</p>
            ))}
          </div>
        </div>
      </Row>
    )
  }
}
export default Calendar

