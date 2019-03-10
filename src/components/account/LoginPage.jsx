import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { Button, Input, Row, Col, Spinner } from 'reactstrap'
import FR from '../../fetchRouter.js';
const validator = require("email-validator");

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      errorMsg: "",
      loginMail: "",
      loginPass: ""
    }
  }

  promptError(str, goToRegister = false) {
    this.setState({ loading: false, error: true, errorMsg: str, register: goToRegister });
  }

  async logIn() {
    this.setState({ loading: true });
    // Clientside will check for valid email format and non empty password field.
    if (!this.state.loginMail || !validator.validate(this.state.loginMail)) {
      this.promptError("Kontrollera din e-post");
      return;
    }

    if (!this.state.loginPass) {
      this.promptError("Lösenordsfältet får ej vara tomt");
      return;
    }
    // eof check
    const fetchData = {
      endpoint: "/user/login",
      body: {
        email: this.state.loginMail,
        password: this.state.loginPass,
      }
    }
    const res = await FR(fetchData)

    if (res.msg === "ok") {
      this.props.state.setAuth({ display: "mitt-konto", linkVal: res.name, authStatus: true }, res)
    }

    if (res.msg === "goregister") {
      this.promptError("Konto finns inte. Men du kan registrera ett!", true);
    }

    // Backend will respond if password is bad.
    if (res.msg === "badpass") {
      this.promptError('Du har angett fel lösenord.');
    }
  }

  handleFormInput(e) {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.logIn();
    }
  }

  dismissError() {
    this.setState({ error: false, errorMsg: "" })
  }


  render() {
    const registerButton = () => (
      <Link className="btn btn-success" color="success" to={"/registrera-konto"}>Skapa konto här</Link>
    )

    const erroring = (
      <Row className="mt-2">
        <Col>
          <h5>{this.state.errorMsg}</h5>
          {this.state.register ? registerButton() : ''}
          <Button color="warning" onClick={this.dismissError.bind(this)}>Ok!</Button>
        </Col>
      </Row>
    )
    const loginForm = () => (
      <Row className="text-center">
        <Col className="m-2 text-center">
          <h3>Logga in på ditt konto</h3>
          <Row className="mb-2 text-center">
            <Col md="6 mx-auto"><Input type="text" placeholder="E-posten din.." name="loginMail" value={this.state.loginMail} onChange={this.handleFormInput.bind(this)} onKeyPress={this.handleKeyPress} /></Col>
          </Row>
          <Row className="mb-2">
            <Col md="6 mx-auto"><Input type="password" placeholder="Lösenordet ditt.." name="loginPass" value={this.state.loginPass} onChange={this.handleFormInput.bind(this)} onKeyPress={this.handleKeyPress} /></Col>
          </Row>
          <Button onClick={this.logIn.bind(this)} color="danger">{this.state.loading === true ? <Spinner /> : 'Logga in'}</Button>
          {this.state.error === true ? erroring : ''}
        </Col>
      </Row>
    )

    return (
      < div className="loginpage">
        {global.auth === !true ? loginForm() : <Redirect to="/mitt-konto" />}
      </div >
    );
  }
  componentDidMount() {
    document.title = 'Logga in på ditt konto';
  }
}

export default withRouter(LoginPage);