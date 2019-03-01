import React, { Component } from 'react';
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap'
import { Link } from 'react-router-dom'

class Auditorium extends Component {

  constructor(props) {
    super(props)
    this.state = { fetched: false }
    this.fetchAuditorium()
  }

  get totalSeats() {
    return this.auditorium.seats.reduce((acc, cur) => acc + cur, 0)
  }

  fetchAuditorium = async () => {
    if (this.state.fetched) {
      this.setState({ fetched: false })
    }
    const auditoriumId = this.props.match.params.id
    const result = await fetch('http://localhost:3000/json/auditoria/' + auditoriumId)
    this.auditorium = await result.json()
    if (this.auditorium.shows) {
      this.sortAndFilterShows()
    }
    this.setState({ fetched: true })
  }

  sortAndFilterShows = () => {
    const now = new Date().toISOString().split('T');
    //set time format and add current date to first movie viewing
    const currentDate = now[0];
    const currentTime = now[1].split(':').slice(0, 2).join(':');
    this.auditorium.shows = this.auditorium.shows.filter(show => {
      if (show.date > currentDate) {
        return true
      } else if (show.date === currentDate && show.time > currentTime) {
        return true
      } else {
        return false
      }
    });
    this.auditorium.shows.sort((a, b) => {
      if (a.date < b.date) { return -1 }
      else if (a.date > b.date) { return 1 }
      else if (a.time < b.time) { return -1 }
      else if (a.time > b.time) { return 1 }
      else { return 0 }
    });
  }

  render() {
    if (!this.state.fetched) {
      return <Spinner color="secondary" />
    } else {
      return (
        <Container>
          <img src={require('../images/' + this.auditorium.imageBig)} alt="Auditorium" className="img-fluid" />
          <Row noGutters>
            <Col xs="12" md="6" className="d-flex">
              <Card>
                <CardBody>
                  <h3 className="card-title">{this.auditorium.name}</h3>
                  <p>{this.auditorium.descriptionLong}</p>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="6" className="d-flex">
              <Card className="flex-grow-1">
                <CardBody>
                  <h5 className="card-title">Info</h5>
                  <p>Högtalarsystem: {this.auditorium.soundSystem}</p>
                  <p>Projektor: {this.auditorium.projector}</p>
                  <p>Godisbutik: {this.auditorium.candyStore}</p>
                  <p>Serveringstillstånd: {this.auditorium.alcohol}</p>
                  <p>Platser: {this.totalSeats}</p>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card>
                <CardBody>
                  <h3 className="card-title">Kommande Visningar</h3>
                    {
                      this.auditorium.shows.slice(0, 3).map(show => {
                        const freeSeats = this.totalSeats - show.bookings.map(booking => booking.seats).flat().length;
                        return (
                            <Row className="my-3 text-white">
                              <Col xs="12" sm="auto">{show.date + ' ' + show.time}</Col>
                              <Col xs="12" sm="auto">{show.movie.title}</Col>
                              <Col xs="12" className="d-flex justify-content-end col-md">
                                <Link to={'/visningar/' + show._id} className="btn btn-outline-danger btn-sm float-md-right">
                                  {freeSeats} kvar av {this.totalSeats} ->
                                </Link>
                              </Col>
                            </Row>
                        )
                      })
                    }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default Auditorium