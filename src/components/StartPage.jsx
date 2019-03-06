import React, { Component } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';
import CarouselStartPage from './CarouselStartPage';
import CardStartPage from './CardStartPage';
import Show from './Show'


class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
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
        <Col xs="12" md="4" className="aside d-flex">
          <h4>Aktuella Visningar</h4>
          <Show />
        </Col>
      </Row>
    </Container>
    )
  }
}
export default StartPage
