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
      <React.Fragment>
        <Row>
          <Col>
            <Card className="card mb-3">
              <CardBody>
                <Row>
                  <Col>
                    <p className="red">{this.props.data.time}</p>
                  </Col>
                  <Col>
                    <CardImg
                      src={require("../images/" +
                        this.props.data.movie.images[0])}
                    />
                  </Col>
                  <Col>
                    <h5 className="">{this.props.data.movie.title}</h5>
                    <p className="m-0">{this.props.data.auditorium.name}</p>
                    <Link
                      to={
                        "/visningar/" + '/'+
                        this.props.data.auditorium.name +'/' +
                        this.props.data.date + '/' +
                        this.props.data.time
                      }
                      className="btn btn-outline-danger mt-auto"
                      id="book-show"
                    >
                      Boka{" "}
                    </Link>
                    <Link
                      to={
                        "/filmer/" + '/'+
                        this.props.data.auditorium.name +'/'+
                        this.props.data.date + '/'+
                        this.props.data.time
                      }
                      className="btn btn-outline-danger mt-auto"
                      id="info"
                    >
                      INFO{" "}
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Show;
