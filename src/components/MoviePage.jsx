import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.movie = require('../json/movie.json')
  }

  render() {
    return (
      <section className="movie-page">
        <Row>
          <Col>
            {
              this.movie.map(movies => (
                <section className="movie-page">
                  <Card className="my-4">¨
                    <Row className="no-gutters">
                      <Col md="3">
                        <CardImg src={require('../images/' + movies.images)} />
                      </Col>
                      <Col md="8" className="d-flex flex-column">
                        <CardBody className="pl-5 padding-fix">
                          <h5 className="card-title-movie mt-3">{movies.title}</h5>
                          <p className="card-text-movie">{movies.genre}</p>
                          <p className="card-text-movie">Från: {movies.productionYear}</p>
                          <p className="card-text-movie">Regissör: {movies.director}</p>
                          <p className="mt-5 font-italic morelinehight">{movies.reviews[0].quote}</p>
                          <p>{movies.reviews[0].source}</p>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                        </CardBody>
                        <div className="pl-5 pb-1 padding-fix">
                          <Link to="/visningar" className="btn btn-outline-danger">Boka</Link>
                          <Link to="/"className="btn btn-outline-danger">Mera</Link>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </section>
              ))
            }
          </Col>
        </Row>
      </section>
    )

  }
}
export default MoviePage