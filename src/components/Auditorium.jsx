import React, { Component } from 'react'
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
    // find the auditorium based on the route parameter (the first regex replaces whitespace and hyphen with nothing in the auditorium names, the second replaces hyphens with nothing in the url param)
    this.auditorium = require('../json/auditoria.json').find(auditorium => auditorium.name.toLowerCase().replace(/[\s-]/g, '') === this.props.match.params.name.replace(/-/g, '').toLowerCase())
    if (this.auditorium) {
      this.fetchShows()
    }
  }

  get totalSeats() {
    return this.auditorium.seats.reduce((acc, cur) => acc + cur, 0)
  }

  fetchShows = async () => {
    // get the shows (i get the whole auditorium because its the most convenient way, and the extra data downloaded is minimal) and save them in this.shows
    const result = await fetch('http://localhost:3000/json/auditoria/id/' + this.auditorium._id)
    const auditorium = await result.json()
    this.shows = auditorium.shows
    if (this.shows) {
      this.sortAndFilterShows()
    }
    this.setState({ fetched: true })
  }

  sortAndFilterShows = () => {
    // get rid of the shows that have already occured, and sort them by date&time
    const now = new Date().toISOString().split('T');
    //set time format and add current date to first movie viewing
    const currentDate = now[0];
    const currentTime = now[1].split(':').slice(0, 2).join(':');
    this.shows = this.shows.filter(show => {
      if (show.date > currentDate) {
        return true
      } else if (show.date === currentDate && show.time > currentTime) {
        return true
      } else {
        return false
      }
    });
    this.shows.sort((a, b) => {
      if (a.date < b.date) { return -1 }
      else if (a.date > b.date) { return 1 }
      else if (a.time < b.time) { return -1 }
      else if (a.time > b.time) { return 1 }
      else { return 0 }
    });
  }

  render() {
    if (!this.auditorium) {
      // incase the url is not a valid auditorium name
      return (
        <Container>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <h3 className="card-title">Fel!</h3>
                  <p>Något gick fel och vi hittade inte den biograf ni sökte!</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }
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
                  // shows a spinner while waiting on the shows to fetch from backend
                  (!this.state.fetched)
                    ?
                    <div className="d-flex justify-content-center">
                      <Spinner color="secondary" />
                    </div>
                    :
                    this.shows.slice(0, 3).map(show => {
                      const freeSeats = this.totalSeats - show.bookings.map(booking => booking.seats).flat().length;
                      return (
                        <Row className="my-3 text-white" key={show._id}>
                          <Col xs="12" sm="auto">{show.date + ' ' + show.time}</Col>
                          <Col xs="12" sm="auto">{show.movie.title}</Col>
                          <Col xs="12" className="d-flex justify-content-end col-md">
                            <Link to={`/visningar/${show.auditorium.name.replace(/\s/, '-').toLowerCase()}/${show.date}/${show.time}`} className="btn btn-outline-danger btn-sm float-md-right">
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

export default Auditorium