import React, { Component } from 'react';
import {
  Container,
  Row,
  Card,
  Spinner,
  Col,
  CardImg,
  CardBody,
  CardText
} from 'reactstrap'
import { Link } from 'react-router-dom'

class Auditoria extends Component {
  constructor(props) {
    super(props)
    this.state = { fetched: false }
    this.fetchAuditoria()
  }

  fetchAuditoria = async () => {
    const response = await fetch('http://localhost:3000/json/auditoria', {
      method: 'GET'
    });
    this.auditoria = await response.json();
    this.setState({ fetched: true })
  }

  render() {
    if (this.state.fetched) {
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
                      <Link to={'/biografer/' + auditorium._id} className="btn btn-outline-danger">MER INFO</Link>
                    </div>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
      )
    } else {
      return (
        <Spinner color="primary" />
      )
    }
  }
}

export default Auditoria