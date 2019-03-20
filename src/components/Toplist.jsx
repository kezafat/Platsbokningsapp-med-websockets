import React, { Component } from 'react';
import { Row, Col, Card, CardBody, } from 'reactstrap';
import { Link } from "react-router-dom";

class Toplist extends Component {
  constructor(props) {
    super(props)
    this.moviesTopList = [];
    //this.ticketsCount();
  }
  async componentDidMount() {
    await this.fetchBookings()
  }

  async fetchBookings() {
    let allBookings = await fetch(`http://localhost:3000/json/bookings/`)
    allBookings = await allBookings.json();

    let ticketCount = {};

    for (let booking of allBookings) {
      if (!booking.show) { continue; }

      let title = booking.show.movie.title;
      if (!ticketCount[title]) {
        ticketCount[title] = { count: 0, movie: title, key: booking.show.movie.id };
      }
      ticketCount[title].count = ticketCount[title].count + booking.seats.length;
    }
    for (let title in ticketCount) {
      this.moviesTopList.push(ticketCount[title])
    }

    this.moviesTopList.sort((a, b) => {
      return b.count - a.count
    });
    this.setState(state => this);
  }

  render() {
    return <div className="top-list">
      <Row>
        <Col>
          <Card>
            <CardBody>
              {this.moviesTopList.map((movie, index) => {

                return <Row>
                  <Col key={index}>{index + 1}</Col>
                  <Col><Link to="/visningar">{movie.movie}</Link></Col>
                  <Col>{movie.count}</Col>
                </Row>

              })}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  }
}

export default Toplist; 