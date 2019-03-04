import React, { Component } from 'react'

class SeatMap extends Component {

  render() {
    return (
      <div className="seat-map">
          {
            this.props.seats.map((row, index) => {
            return (
              <div key={index}>
                {row}
              </div>
            )
        })}      
      </div>
    )
  }
}

export default SeatMap