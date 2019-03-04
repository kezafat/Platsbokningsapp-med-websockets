import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Day from "./Day";

class ShowContainer extends Component {
  constructor(props){
    super(props);
}
    render() {
    return (
      <div>
       <Day />
        <Row />
        <Col />
        <Card className="mb-3">
          <CardBody>
            <p className="red {this.movie.title} "/>
            <h5 className="m-0" />
         
            <Button
              className="btn btn-outline-danger mt-auto"
              href="/book-show?show={this._id}"
              role="button"
              id="book-show"
            >
              Boka
            </Button>
            <Button
              className="btn btn-outline-danger mt-auto"
              href="/film?film={this._id}"
              role="button"
              id="info"
            >
              Mer info
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ShowContainer;
