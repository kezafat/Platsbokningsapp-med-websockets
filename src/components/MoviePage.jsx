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
    this.state = { fetched: false }
    this.movies = require('../json/movie.json')
    this.fetchShows()
  }

  fetchShows = async () => {
    const result = await fetch('http://localhost:3000/json/movies/')
    const movies = await result.json()
    for(let movie in movies){
      this.shows = movies[movie].shows
      console.log(this.shows)
      
    }
    this.state = { fetched: true }
  }

  componentDidMount() {
    this.setStars()
  }

  setStars() {
    let movies = this.movies;
    for(let i = 0; i < movies.length; i++ ){
      let starsCount = movies[i].reviews[0].stars;
      let htmlStars = document.getElementsByClassName("fa-star");
      for (let j = 5 * i; j < starsCount + 5* i; j++) {
        (htmlStars[j]).classList.add('checked');
      }
    }
  }

  render() {
    return (
      <section className="movie-page">
        <Row>
          <Col>
            {
              this.movies.map((movies, index) => (
                <section className="movie-page" key={index}>
                  <Card className="my-4 no-gutters">
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
                          <p className="mt-5 font-italic morelinehight">"{movies.reviews[0].quote}"</p>
                          <p>{movies.reviews[0].source}</p>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                          <FontAwesomeIcon icon="star"></FontAwesomeIcon>
                        </CardBody>
                        <div className="pl-5 pb-1 padding-fix">
                          <Link to={"/book-show/"} className="btn btn-outline-danger">Boka</Link>
                          <Link to="/" className="btn btn-outline-danger">Mera</Link>
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