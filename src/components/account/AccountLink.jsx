import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { NavItem, } from 'reactstrap'
import FR from '../../fetchRouter.js'

class AccountLink extends Component {
  constructor(props) {
    super(props);
    this.checkLogin();
  }

  async checkLogin() {
    const fetchData = { endpoint: "/user/login", }
    const res = await FR(fetchData);

    if (res.msg === "ok") {
      this.props.state.setAuth({ display: "mitt-konto", linkVal: res.name, authStatus: true }, res);
      return;
    }

    if (res.msg === "error" || res.msg === "noauth") {
      this.props.state.setAuth({ display: "welcome", linkVal: "Konto", authStatus: false });
      return;
    }
  }

  getBadgeColor() {
    return !global.auth ? "btn btn-success" : "btn btn-danger";
  }

  render() {
    const linkVal = this.props.state.linkVal;
    return (
      <NavItem>
        <NavLink to='/konto' onClick={this.props.nav.closeNavbar} className={this.getBadgeColor()}>
          {linkVal}
        </NavLink>
      </NavItem>
    );
  }
}

export default AccountLink;