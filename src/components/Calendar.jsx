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
      <Row className="shows-calendar mx-2 rounded">
        <div>
          <h3 className="text-center my-2 ml-4">Kalendarium</h3>
        </div>
        <div className="text-center ml-2">
          {this.state.data.slice(0, 12).sort().map((show, _id) => (
            <p key={_id}>{show.date} {'   '}<strong>kl.</strong> {'   '} {show.time}<br />
              {show.movie.title}</p>
          ))}
        </div>
      </Row>
    )
  }
}
export default Calendar

