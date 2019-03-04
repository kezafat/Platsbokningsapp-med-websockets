import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'

class MovieInfoCard extends Component {

  render() {
    return (
      <Card className="mb-3">
        <CardBody>
          <Row className="movie-info">
            <Col xs="4" md="auto">
              <figure>
                <img src={require('../images/' + this.props.show.movie.images[0])} alt="Movie Poster" />
              </figure>
            </Col>
            <Col xs="8" md="auto">
              <h3>{this.props.show.movie.title}</h3>
              <h4>{this.props.show.auditorium.name}</h4>
              <h5>{this.props.show.date}</h5>
              <h5>{this.props.show.time}</h5>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default MovieInfoCard