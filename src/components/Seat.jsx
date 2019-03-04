import React, { Component } from 'react'

class Seat extends Component {
  constructor(props) {
    super(props)
    Object.assign(this, this.props)
  }

  render() {
    const { handleMouseOver, handleMouseLeave, handleClick, row, seatNumber, booked, highlighted, invalid, selected } = this.props
    return (
      <span className={`seat row-${row} ${seatNumber} ${booked ? 'booked' : ''} ${highlighted ? 'highlighted-seat' : ''} ${invalid ? 'invalid-selection' : ''} ${selected ? 'selected-seat' : ''}`} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick}>{seatNumber}</span>
    )
  }
}

export default Seat