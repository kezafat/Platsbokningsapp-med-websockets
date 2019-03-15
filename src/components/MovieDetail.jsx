import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Spinner
} from 'reactstrap'
import { Link } from 'react-router-dom'

class MovieDetail extends Component {
  constructor() {
    super()
    this.state = { fetched: false }
  }

  async fetchMovie() {
    const { title } = this.props.match.params
    const response = await fetch(`http://localhost:3000/json/movies/${title}`)
    this.movie = await response.json()
    this.movie = this.movie[0]
    this.movie.shows = this.getNextShow(this.movie.shows)
    this.state = { fetched: true }
    this.setState(state => this)
  }

  async componentDidMount() {
    await this.fetchMovie()
  }

  getNextShow(shows) {
    /*Getting the next coming show */
    shows.sort(function (a, b) {
      return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    });
    let i = 0;
    let foundShows = []
    for (let show of shows) {
      let date = new Date(show.date + ' ' + show.time)
      if (date >= new Date()) {
        i++;
        foundShows.push(show)
        if (i === 5) {
          return foundShows
        }
      }
    }
    return foundShows
  }

  render() {
    let movie = this.movie
    if (!this.movie) {
      return <div className="d-flex justify-content-center">
        <Spinner color="danger" />
      </div>
    }
    return (
      <section className="movie-detail">
        <React.Fragment>
          <Row className="justify-content-between">
            <Col>
              <h3 className="movie-title">{movie.title}</h3>
            </Col>
            <Col>
              <Link to={"/visningar/" + movie.shows[0].auditorium.name.replace(" ", "-").toLowerCase() + "/" + movie.shows[0].date + "/" + movie.shows[0].time} className="btn btn-outline-danger float-right">Boka</Link>
            </Col>
          </Row>
          <Row className="media mb-5 justify-content-between">
            <Col md="4">
              <img src={require('../images/' + movie.images)} alt={movie.imgages} className="img" />
            </Col>
            <Col md="7">
              <div className="category-genre pl-1">
                <span>Genre: {movie.genre}</span>
              </div>
              <p className="description-text pl-1">{movie.description}</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="p-3 mb-3">
              <Card>
                <CardBody>
                  <Row className="py-3">
                    <Col md="6" className="catagory line-break">
                      <span><b>Skådespelare:</b><br /></span>
                      <ul>
                        {this.movie.actors.map((actor, index) => <li key={index}>{actor}</li>)}
                      </ul>
                    </Col>
                    <Col md="6" className="pl-3">
                      <div className="category"><span>Produktionsår:</span></div>
                      <div className="d-inline"><span>{" " + movie.productionYear}</span></div>
                      <hr />
                      <div className="category"><span>Land: </span></div>
                      <div className="d-inline"><span>{" " + movie.productionCountries}</span></div>
                      <hr />
                      <div className="category"><span>Längd: </span></div>
                      <div className="d-inline"><span>{" " + movie.length}</span></div>
                      <hr />
                      <div className="category"><span>Språk: </span></div>
                      <div className="d-inline"><span>{" " + movie.language}</span></div>
                      <hr />
                      <div className="category"><span>Undertext: </span></div>
                      <div className="d-inline"><span>{" " + movie.subtitles}</span></div>
                      <hr />
                      <div className="category"><span>Utgivare: </span></div>
                      <div className="d-inline"><span>{" " + movie.distributor}</span></div>
                      <hr />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3 justify-content-between">
            <Col md="3">
              <Card className="mb-0 py-3">
                <CardBody>
                  <ul>
                    {this.movie.shows.map(show =>
                      <div key={show.id} className="mb-2">
                        <li>{show.time}</li>
                        <li>{show.date}</li>
                        <li>{show.auditorium.name}</li>
                      </div>
                    )}
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="9" className="mt-4 mt-lg-0">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe src={"https://www.youtube.com/embed/" + movie.youtubeTrailers} title="video" className="embed-responsive-item" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      </section>
    )
  }
}
export default MovieDetail