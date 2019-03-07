import React, { Component } from "react";
import Show from "./Show";
//import { Row } from "reactstrap";

class Day extends Component {
  render() {
    return (
      <div className="date" ml-3>
        <h4>{this.props.show.date}</h4>
        {this.props.show.shows.map((show, index) => (
          <Show key={index} show={show} />
        ))}
      </div>
    );
  }
}

export default Day;
