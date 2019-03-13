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
    return (<Row className="shows-calendar ml-2">
      <h3 className="text-center">Fuckin' Kalendarium</h3>
      <div className="text-center m-2">
        {this.state.data.slice(0, 15).map((show, _id) => (
          <p>{show.date} kl. {show.time}<br />
            {show.movie.title}</p>
        ))}
      </div>)
    </Row>)
  }
}
export default Calendar