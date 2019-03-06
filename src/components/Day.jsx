import React, { Component } from "react";
import Show from './Show';

class Day extends Component {
  
  render() {

    return (
      <div>
        <h4>{this.props.data.date}</h4>
        {this.props.data.shows.map((show, index) => (
          <Show key={index} data={show} />
        ))}
      </div>
    );
  }
}

export default Day;
