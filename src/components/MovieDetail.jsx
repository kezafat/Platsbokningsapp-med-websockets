import React, { Component } from 'react';
import {
  Row,
} from 'reactstrap'
import { Link } from 'react-router-dom'

class MovieDetail extends Component {
  constructor() {
    super()
    this.state = { fetched: false }
    this.movie = []
  }

  async fetchMovie() {
    const { title } = this.props.match.params
    const response = await fetch(`http://localhost:3000/json/movies/${title}`)
    this.movie = await response.json()
    this.state = { fetched: true }
    this.setState(state => this)
  }

  async componentDidMount() {
    await this.fetchMovie()
  }

  render() {
    return (
      <section className="movie-detail">
        {
          this.movie.map((movie) => (
            <Row className="justify-content-between">
              <h3 className="movie-title pl-2 p-0" key={movie._id}>{movie.title}</h3>
            </Row>
          ))
        }
      </section>
    )
  }
}
export default MovieDetail