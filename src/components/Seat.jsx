import React, { Component } from 'react'

class Seat extends Component {
  constructor(props) {
    super(props)
    Seat.counter = Seat.counter || 0
  }

  render() {
    return (
      <span className={`seat row-${this.props.row} ${this.props.seatNumber}`} >{this.props.seatNumber}</span>
    )
  }
}

export default Seat