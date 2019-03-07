import React, { Component } from "react";
import { Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    // this.props = props;
    this.movie = this.props.movie;
    this.auditorium = this.props.auditorium;
  }

  render() {
    return (
        <Row>
          <Col>
            <Card className="card mb-3">
              <Row className="no-gutters">
                <Col className="col-sm-auto col-1 mr-4 mt-3 ml-3">
                  <p className="red">{this.props.show.time}</p>
                </Col>
                <Col  className="col-sm-auto col-3">
                  <CardImg
                    className="col-sm-auto col-3"
                    src={require("../images/" +
                      this.props.show.movie.images[0])}
                  />
                </Col>
                <Col className="col-sm-auto col-6 d-flex flex-column">
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
                      className="btn btn-outline-danger mt-auto"
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
                      className="btn btn-outline-danger mt-auto"
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
