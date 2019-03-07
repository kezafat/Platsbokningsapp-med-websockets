import React, { Component } from "react";
import { Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    this.movie = this.props.movie;
    this.auditorium = this.props.auditorium;
  }

  render() {
    return (
      <Row>
        <Col>
          <Card className="card mb-3">
            <Row className="no-gutters">
              <Col sm="auto" md="1" className="mr-4 mt-3 ml-3">
                <p className="red">{this.props.show.time}</p>
              </Col>
                <Col sm="auto" md="3">
                  <CardImg
                    src={require("../images/" +
                      this.props.show.movie.images[0])}
                  />
                </Col>
              <Col sm="auto" md="6" className="d-flex flex-column pl-3">
                <CardBody>
                  <h5 className="m-0">{this.props.show.movie.title}</h5>
                  <p>{this.props.show.auditorium.name}</p>
                </CardBody>
                <div className="pl-3">
                  <Link
                    to={
                      "/bokning/" +
                      this.props.show.auditorium.name
                        .replace(" ", "-")
                        .toLowerCase() +
                      "/" +
                      this.props.show.date +
                      "/" +
                      this.props.show.time +
                      "/" +
                      this.props.show.movie.title
                    }
                    className="btn btn-outline-danger mt-auto mb-3"
                  >
                    Boka
                  </Link>
                  <Link
                    to={
                      "/filmer/" +
                      this.props.show.auditorium.name
                        .replace(" ", "-")
                        .toLowerCase() +
                      "/" +
                      this.props.show.date +
                      "/" +
                      this.props.show.time
                    }
                    className="btn btn-outline-danger mt-auto ml-3 mb-3"
                  >
                    INFO
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Show;
