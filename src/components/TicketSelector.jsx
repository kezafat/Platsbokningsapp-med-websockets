import React, { Component } from 'react'
import {
  Row,
  Col
} from 'reactstrap'

class TicketSelector extends Component {

  ticketTypes = [
    { DOMtext: 'Ordinarie (85 kr/st)', class: 'adult'},
    { DOMtext: 'Pensionär (75 kr/st)', class: 'senior'},
    { DOMtext: 'Barn (65 kr/st)', class: 'kids'}
  ]


  render() {
    const ticketsCount = Object.values(this.props.tickets).reduce((accumulator, current) => accumulator + current, 0)

    return (
      <Row className="ticket-selector">
        <Col md="" />
          {
            this.ticketTypes.map(ticket => (
              <Col xs="12" sm="auto" key={ticket.class}>
                <h6>{ticket.DOMtext}</h6>
                <div className={`ticket-incrementor ${ticket.class}`}>
                  <span className={`minus${!this.props.tickets[ticket.class] ? ' disabled' : ''}`} onClick={this.props.subtractTicket}>-</span>
                  <span className="ticket-count">{this.props.tickets[ticket.class]}</span>
                  <span className={`plus${ticketsCount >= Math.min(8, this.props.freeSeatsCount) ? ' disabled' : ''}`} onClick={this.props.addTicket}>+</span>
                </div>
              </Col>
            ))
          }
        <Col md="" />
      </Row>
    )
  }
}

export default TicketSelector