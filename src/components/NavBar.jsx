import React, { Component } from 'react';
import {
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import AccountLink from './account/AccountLink'
class NavBar extends Component {
  constructor(props) {
    super(props);
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
    const smallLinkColor = global.auth ? 'btn-danger' : 'btn-success';
    const mobileAccountLink = () => (
      <Link to='/mitt-konto' className={"btn btn-small smallNavLink " + smallLinkColor} >{this.props.state.linkVal}</Link>
    )

    return (
      <Container>
        <Navbar expand="lg" dark>
          <Link to='/' className="navbar-brand">Dö Hårt Biografen</Link>
          <NavbarToggler onClick={this.toggleNavbar} />
          {mobileAccountLink()}
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact to='/' onClick={this.closeNavbar} className="nav-link">Start</NavLink>
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
              <AccountLink state={this.props.state} nav={this} />
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}
export default NavBar;