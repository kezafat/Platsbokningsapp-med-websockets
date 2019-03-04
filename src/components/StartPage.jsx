import React, { Component } from 'react';
import {
  Container, Row, Col, Card, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody
} from 'reactstrap';
import {
  Image
} from 'react-slick';
import CarouselStartPage from './CarouselStartPage';
import { Link } from 'react-router-dom';


class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
    /* */
  }
  render() {
    return (<Container className="StartPage">
      <Row noGutters>
        <div id="carousel">
          <CarouselStartPage className="carousel" />
        </div>
        <Image src="./images/diehard-artposter.jpg" alt="art-poster" className="img-fluid" />
        <Col xs="12" className="d-flex">
          <CardGroup className="moviescard-wrapper mb-2">
            {this.movies.map((movie) => {
              return (<Card className="moviescard">
                <CardBody>
                  <CardTitle><h4>{movie.title}</h4></CardTitle>
                  <CardImg top width="100%" src={require('../images/' + movie.images)} alt="Posters" />
                  <CardSubtitle className="my-2"><p>[{movie.productionCountries}] {movie.director}<br />
                    {movie.genre} {movie.productionYear}</p></CardSubtitle>
                  <CardText><p>{movie.description.substr(0, 150) + '...'}</p></CardText>
                  <Link to={'/visningar/'} className="btn btn-outline-danger">Visningar</Link>
                </CardBody>
              </Card>
              )
            })}
          </CardGroup>
        </Col>
      </Row>
    </Container>

    )
  }
}

export default StartPage