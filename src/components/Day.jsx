import React, { Component } from "react";
import Show from "./Show";
import { Col } from "reactstrap";

class Day extends Component {
  render() {
    return (
      <React.Fragment>
        <Col>
          <h4>{this.props.show.date}</h4>
          {this.props.show.shows.map((show, index) => (
            <Show key={index} show={show} />
          ))}
        </Col>
      </React.Fragment>
    );
  }
}

export default Day;
