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
  constructor() {
    super()
    this.state = { fetched: false }
    this.movies = []
  }

  async fetchMovies() {
    const result = await fetch('http://localhost:3000/json/movies/')
    this.movies = await result.json()
    for (let movie of this.movies) {
      movie.nextShow = this.getNextShow(movie.shows)
    }
    this.state = { fetched: true }
    this.setState(state => this)
    this.setStars()
  }

  getNextShow(shows) {
    /*Getting the next coming show */
    shows.sort(function (a, b) {
      return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    });
    for (let show of shows) {
      let date = new Date(show.date + ' ' + show.time)
      if (date >= new Date()) {
        return show
      }
    }
    return {}
  }

  async componentDidMount() {
    await this.fetchMovies()
  }

  setStars() {
    /* Method for adding the star */
    for (let i = 0; i < this.movies.length; i++) {
      let starsCount = this.movies[i].reviews[0].stars;
      let htmlStars = document.getElementsByClassName("fa-star");
      for (let j = 5 * i; j < starsCount + 5 * i; j++) {
        if (htmlStars[j]) {
          (htmlStars[j]).classList.add('checked');
        }
      }
    }
  }

  render() {
    return (
      <section className="movie-page">
        <Row>
          <Col>
            {
              this.movies.map((movie) => (
                <section className="movie-page" key={movie._id}>
                  <Card className="my-4 no-gutters">
                    <Row className="no-gutters">
                      <Col md="3">
                        <CardImg src={require('../images/' + movie.images)} />
                      </Col>
                      <Col md="8" className="d-flex flex-column">
                        <CardBody className="pl-5 padding-fix">
                          <h5 className="card-title-movie mt-3">{movie.title}</h5>
                          <p className="card-text-movie">{movie.genre}</p>
                          <p className="card-text-movie">Från: {movie.productionYear}</p>
                          <p className="card-text-movie">Regissör: {movie.director}</p>
                          <p className="mt-5 font-italic morelinehight">"{movie.reviews[0].quote}"</p>
                          <p>{movie.reviews[0].source}</p>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                        </CardBody>
                        <div className="pl-5 pb-1 padding-fix">
                          {/* added ternery so application dosen't crash if we dont have any shows*/}
                          <Link to={!movie.nextShow._id ? "/visningar/" : "/visningar/" +
                            movie.nextShow.auditorium.name
                              .replace(" ", "-")
                              .toLowerCase() +
                            "/" +
                            movie.nextShow.date +
                            "/" +
                            movie.nextShow.time +
                            "/"
                          }
                            className="btn btn-outline-danger">Boka</Link>
                          <Link to={"/filmer/" +
                            movie.title
                              .replace(/ /g, "-")
                              .replace(/:/g, "")
                              .toLowerCase()}
                            className="btn btn-outline-danger">Mera</Link>
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