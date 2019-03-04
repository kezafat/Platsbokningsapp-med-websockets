import React, { Component } from 'react';
import {
  Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.movies = require('../json/movies.json');
  }
  render() {
    return (<Container className="StartPage">
      <Row>
        <Col xs="12" md="12" className="d-flex">
          {this.movies.map((movie) => {
            return <div className="Movies">
              <CardGroup>
                <Card>
                  <CardBody>
                    <CardTitle><h4>{movie.title}</h4></CardTitle>
                    <CardImg top width="100%" src={require('../images/' + movie.images)} alt="Posters" />
                    <CardSubtitle><p>{movie.productionCountries} || {movie.director}<br />
                      {movie.genre}, {movie.productionYear} </p></CardSubtitle>
                    <CardText><p>{movie.description.substr(0, 100) + '...'}</p></CardText>
                    <Button to={'/visningar/'} className="btn btn-outline-danger">Visningar</Button>
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