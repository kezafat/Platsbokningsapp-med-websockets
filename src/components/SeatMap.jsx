import React, { Component } from 'react'
import Seat from './Seat'

class SeatMap extends Component {

  render() {
    const { handleMouseOver, handleMouseLeave, handleClick, rows } = this.props
    return (
      <div className="seat-map">
          {
            rows.map((row, index) => {
            return row[0] ? (
              <div key={index}>
                {
                  row.map(seatProps => (
                    <Seat {...seatProps} key={seatProps.seatNumber} handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} handleClick={handleClick} />
                  )).reverse()
                }
              </div>
            )
            :
            ''
        })}      
      </div>
    )
  }
}

export default SeatMap