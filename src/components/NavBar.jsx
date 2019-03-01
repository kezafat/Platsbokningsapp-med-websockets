import React, { Component } from 'react';
import {
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap'
import { NavLink, Link} from 'react-router-dom'


class NavBar extends Component {
  constructor() {
    super();
    this.state = {
    collapsed: true
    };
}

toggleNavbar = () => {
    this.setState({
    collapsed: !this.state.collapsed
    });
}

closeNavbar = () => {
    if (!this.state.collapsed === true) {
    this.toggleNavbar();
    }
}

  render() {
    return (
      <Container>
        <Navbar expand="lg" dark>
          <Link to='/' className="navbar-brand">Dö Hårt Biografen</Link>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to='/' onClick={this.closeNavbar} className="nav-link">Start</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/filmer' onClick={this.closeNavbar} className="nav-link">Filmer</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/biografer' onClick={this.closeNavbar} className="nav-link">Biografer</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/visningar' onClick={this.closeNavbar} className="nav-link">Visningar</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}
export default NavBar;