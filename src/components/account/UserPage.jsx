import React, { Component } from 'react';
import { Redirect } from 'react-router';
import UserContent from './UserContent'
import FR from '../../fetchRouter.js';
import { Button, Spinner, Jumbotron } from 'reactstrap';


class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  }

  async logOut() {
    this.setState({ loading: true });
    const fetchData = {
      endpoint: "/user/logout"
    }
    const res = await FR(fetchData);
    if (res.msg === "ok") {
      this.props.state.setAuth({ display: "welcome", linkVal: "Konto", authStatus: false })
    }
  }

  render() {
    return (
      <div className="accountpage">
        <Jumbotron className="text-center p-1">
          <h3 className="text-dark">Hej, {global.user.name}!</h3>
          <p className="text-dark">Glöm inte att logga ut när du är klar!<br />Du vill väl inte att någon ska bevittna ditt die-hard missbruk?</p>
          <Button color="danger" onClick={this.logOut.bind(this)}>
            {this.state.loading === true ? <Spinner /> : 'Logga ut'}
          </Button>
        </Jumbotron>
        {global.auth ? <UserContent state={this.props.state} /> : <Redirect to="/konto" />}
      </div>
    );
  }

  componentDidMount() {
    const title = this.props.state.linkVal + 's sida';
    document.title = title;
  }
}

export default UserPage;