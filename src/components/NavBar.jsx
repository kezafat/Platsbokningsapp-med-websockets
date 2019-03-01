import React, { Component } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container>
        <Navbar expand="lg" dark>
          <NavbarBrand href="/">Dö Hårt Biografen</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/' className="nav-link">Start</Link>
              </NavItem>
              <NavItem>
                <Link to='/filmer' className="nav-link">Filmer</Link>
              </NavItem>
              <NavItem>
                <Link to='/biografer' className="nav-link">Biografer</Link>
              </NavItem>
              <NavItem>
                <Link to='/visningar' className="nav-link">Visningar</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}
export default NavBar;