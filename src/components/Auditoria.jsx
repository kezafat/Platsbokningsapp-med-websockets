import React, { Component } from 'react';
import {
  Container,
  Row,
  Card,
  Col,
  CardImg,
  CardBody,
  CardText
} from 'reactstrap'
import { Link } from 'react-router-dom'

class Auditoria extends Component {
  constructor(props) {
    super(props)
    this.auditoria = require('../json/auditoria.json')
  }
  
  componentDidMount(){
    document.title="Biografer"
  }

  render() {
    return (
      <Container>
        <Row>
          {
            this.auditoria.map(auditorium => (
              <Col xs="12" md="4" className="d-flex my-3" key={auditorium.name}>
                <Card>
                  <CardImg top src={require('../images/' + auditorium.imageSmall)} />
                  <CardBody className="p-3">
                    <h5 className="card-title">{auditorium.name}</h5>
                    <CardText>{auditorium.descriptionShort}</CardText>
                  </CardBody>
                  <div className="p-3">
                    <Link to={'/biografer/' + auditorium.name.replace(' ', '-').toLowerCase()} className="btn btn-outline-danger">MER INFO</Link>
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    )
  }
}

export default Auditoria