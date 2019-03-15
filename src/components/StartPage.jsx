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
    return (<Container fluid>
      <CarouselStartPage />
      <Row noGutters>
        {this.movies.map((movie, i) => {
          return (
            <Col xs="12" sm="6" md="4" className="startpage-cards d-flex" key={i}>
              <CardStartPage movie={movie} />
            </Col>)
        })}
        <Col xs="12" sm="6" md="4" className="time-table d-flex">
          <Calendar />
        </Col>
      </Row>
    </Container>)
  }
}

export default StartPage
