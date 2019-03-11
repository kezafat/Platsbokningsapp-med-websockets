import React, { Component } from 'react'

class Seat extends Component {

  render() {
    const { handleMouseOver, handleMouseLeave, handleClick, row, seatNumber, booked, highlighted, invalid, selected, deselect } = this.props
    return (
      <span className={`seat row-${row} ${seatNumber} ${booked ? 'booked' : ''} ${highlighted ? 'highlighted-seat' : ''} ${invalid ? 'invalid-selection' : ''} ${selected ? 'selected-seat' : ''} ${deselect ? 'deselect-seat' : ''}`} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick}></span>
    )
  }
}

export default Seat