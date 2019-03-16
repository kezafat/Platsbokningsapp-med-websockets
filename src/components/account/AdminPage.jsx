import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AdminMovies from './AdminMovies'
import FR from '../../fetchRouter.js';
import { Button, Spinner, Jumbotron } from 'reactstrap';


class AdminPage extends Component {
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
      <div className="adminpage">
        <Jumbotron className="text-center p-1">
          <h3 className="text-dark">Hej, {global.user.name}!</h3>
          <p className="text-dark">You're the daddy of them all!</p>
          <Button color="danger" onClick={this.logOut.bind(this)}>
            {this.state.loading === true ? <Spinner /> : 'Logga ut'}
          </Button>
        </Jumbotron>
        {global.auth === "admin" ? <AdminMovies state={this.props.state} /> : <Redirect to="/konto" />}
      </div>
    );
  }

  componentDidMount() {
    document.title = "Admin | " + this.props.state.linkVal;
  }
}

export default AdminPage;