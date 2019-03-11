import React, { Component } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';
import CarouselStartPage from './CarouselStartPage';
import CardStartPage from './CardStartPage';
import Shows from './Shows';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
    this.shows = [];

  }
  render() {
    return (<Container fluid>
      <Row noGutters>
        <CarouselStartPage />
        {this.movies.map((movie) => {
          return (
            <Col xs="12" md="4" className="d-flex">
              <CardStartPage movie={movie} />
            </Col>)
        })}
        {this.shows.map((show) => {
          return (
            <Col xs="12" md="4" className="aside d-flex">
              <Shows show={show} />
            </Col>)
        })}
      </Row>
    </Container>
    )
  }
}
export default StartPage
