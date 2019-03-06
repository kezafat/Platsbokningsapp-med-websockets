import React, { Component } from 'react'
import {
  Spinner,
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'
import MovieInfoCard from './MovieInfoCard'
import SeatSelector from './SeatSelector'
import ErrorBoundary from './ErrorBoundary'

class BookShow extends Component {
  constructor(props) {
    super(props) 
    this.state = { show: false, fetched: false }
    // the idea is that this component owns the state about the show (and thus socket.io communication), and seatselector component owns the state about seat selection and ticket numbers
    this.fetchShow()
  }

  async fetchShow() {
    const { auditorium, date, time } = this.props.match.params
    const response = await fetch(`http://localhost:3000/json/shows/${auditorium}/${date}/${time}`)
    const shows = await response.json()
    this.setState({ show: shows[0], fetched: true })
  }

  render() {
    const now = new Date().toISOString().split('T');
    const currentDate = now[0];
    const currentTime = now[1].split(':').slice(0, 2).join(':');

    if (!this.state.fetched) {
      return <Spinner color="secondary" />
    }
    if (!this.state.show) {
      return <Card>
                <CardBody>
                  <h3>Fel!</h3>
                  <p>Något gick fel och vi hittade ingen visning på det aktuella datumet</p>
                </CardBody>
              </Card>
    }
    return (
      <Row className="book-show-container">
        <Col xs="12" md="10" lg="8" className="book-show">
          <MovieInfoCard show={this.state.show} />
          <ErrorBoundary>
            {
              (this.state.show.date > currentDate || (this.state.show.date === currentDate && this.state.show.time > currentTime))
              ?
              <SeatSelector show={this.state.show} />
              :
              <Card>
                <CardBody>
                  <h3>Historisk Föreställning</h3>
                  <p>Denna föreställning har redan ägt rum och det går inte att boka några biljetter till den</p>
                </CardBody>
              </Card>
            }
          </ErrorBoundary>
        </Col>
      </Row>
    )
  }
}

export default BookShow