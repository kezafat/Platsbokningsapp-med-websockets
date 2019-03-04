import React, { Component } from 'react'
import {
  Spinner,
} from 'reactstrap'
import MovieInfoCard from './MovieInfoCard'
import SeatSelector from './SeatSelector'

class BookShow extends Component {
  constructor(props) {
    super(props) 
    this.state = { show: false }
    // the idea is that this component owns the state about the show (and thus socket.io communication), and seatselector component owns the state about seat selection and ticket numbers
    this.fetchShow()
  }

  async fetchShow() {
    const { auditorium, date, time } = this.props.match.params
    const response = await fetch(`http://localhost:3000/json/shows/${auditorium}/${date}/${time}`)
    const shows = await response.json()
    this.setState({ show: shows[0] })
  }

  render() {
    if (!this.state.show) {
      return <Spinner color="secondary" />
    }
    return (
      <div className="book-show-container">
        <section className="book-show">
          <MovieInfoCard show={this.state.show} />
          <SeatSelector show={this.state.show} />        
        </section>
      </div>
    )
  }
}

export default BookShow