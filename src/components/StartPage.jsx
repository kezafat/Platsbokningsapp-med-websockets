import React, { Component } from 'react';
import CarouselStartPage from './CarouselStartPage';
import {
  Container, Row, Col, Card, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';


class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
  }
  render() {
    return (<Container className="StartPage">
      <CarouselStartPage />
      <Row>
        <Col xs="12" className="d-flex">
          {this.movies.map((movie) => {
            return <div className="MoviesCard m-1">
              <CardGroup>
                <Card>
                  <CardBody>
                    <CardTitle><h4>{movie.title}</h4></CardTitle>
                    <CardImg top width="100%" src={require('../images/' + movie.images)} alt="Posters" />
                    <CardSubtitle><p>{movie.productionCountries} || {movie.director}<br />
                      {movie.genre}, {movie.productionYear} </p></CardSubtitle>
                    <CardText><p>{movie.description.substr(0, 100) + '...'}</p></CardText>
                    <Link to={'/visningar/'} className="btn btn-outline-danger">Visningar</Link>
                  </CardBody>
                </Card>
              </CardGroup>
            </div>
          })}
        </Col></Row>
    </Container>

    )
  }
}

export default StartPage