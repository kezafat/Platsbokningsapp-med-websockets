import React, { Component } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';
import CarouselStartPage from './CarouselStartPage';
import CardStartPage from './CardStartPage';
import Calendar from './Calendar';


class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
  }

  render() {
    return (<section className="startpage">
      <CarouselStartPage />
      <Row noGutters>
        <Col xs="12" sm="12">
          <h1 className="text-light font-weight-light"> På bio just nu</h1>
        </Col>
        {this.movies.map((movie, i) => {
          return (
            <Col xs="12" sm="6" md="3" lg="4" className="startpage-cards d-flex justify-content-center" key={i}>
              <CardStartPage movie={movie} />
            </Col>)
        })}
        <Col xs="12" sm="6" md="3" lg="4" className="d-flex mb-2">
          <Calendar />
        </Col>
      </Row>
    </section>)
  }
}

export default StartPage
