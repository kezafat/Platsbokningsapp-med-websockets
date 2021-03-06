import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Jumbotron } from 'reactstrap';
import WelcomePage from './WelcomePage'


class AccountPage extends Component {
  render() {
    const display = this.props.state.display;
    return (
      <Jumbotron className="accountpage">
        {display === "welcome" && <WelcomePage location={this.props.location} />}
        {display === "registrera-konto" && global.auth !== true ? <Redirect to="/registrera-konto" /> : ''}
        {display === "mitt-konto" && global.auth === true ? <Redirect to="/mitt-konto" /> : ''}
        {display === "admin" && global.auth === "admin" ? <Redirect to="/admin" /> : ''}
      </Jumbotron>
    )
  }
  componentDidMount() {
    document.title = "Logga in eller skapa på ditt konto.";
  }
}

export default AccountPage;