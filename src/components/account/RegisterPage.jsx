import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Button, Input, Row, Col, Spinner } from 'reactstrap';
import FR from '../../fetchRouter.js';
import * as validator from "email-validator"

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      errorMsg: "",
      registerName: "",
      registerMail: "",
      registerPass: "",
    }
  }

  promptError(str, goToLogin = false) {
    this.setState({ loading: false, error: true, errorMsg: str, login: goToLogin });
  }

  async registerUser() {
    this.setState({ loading: true });
    if (!this.state.registerName) {
      this.promptError("Namn måste anges");
      return;
    }
    if (!this.state.registerMail || !validator.validate(this.state.registerMail)) {
      this.promptError("Kontrollera att din e-post är rätt");
      return;
    }
    if (!this.state.registerPass) {
      this.promptError("Du måste ange ett lösenord..");
      return;
    }

    const fetchData = {
      endpoint: "/user/register",
      body: {
        name: this.state.registerName,
        email: this.state.registerMail,
        password: this.state.registerPass,
      }
    }
    const res = await FR(fetchData);
    if (res.msg === "login") {
      this.promptError("Detta konto finns redan, logga in istället?", true);
      return;
    }
    if (res.msg === "error") {
      // For client this means DB error, on backend this can be missing email or pwd (for users posting with postman)
      // In case of DB errors, db will respond with the errortext for debugging
      this.setState({ loading: false, error: true, errorMsg: res.res, login: false });
    }

    if (res.msg === "ok") {
      this.props.state.setAuth({ display: "mitt-konto", linkVal: res.name, authStatus: true }, res)
    }
  }

  handleFormInput(e) {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.registerUser();
    }
  }

  dismissError() {
    this.setState({ error: false, loading: false, errorMsg: "" })
  }

  render() {
    const loginBtn = () => (
      <Link className="btn btn-success" color="warning" to={"/logga-in"}>Logga in här</Link>
    )

    const erroring = (
      <Row className="mt-2">
        <Col>
          <h5>{this.state.errorMsg}</h5>
          {this.state.login ? loginBtn() : ''}
          <Button color="warning" onClick={this.dismissError.bind(this)}>Försök igen</Button>
        </Col>
      </Row>
    )

    const registerForm = () => (
      <Row className="text-center">
        <Col className="m-2 text-center">
          <h3>Skapa dig ett kostnadsfritt konto</h3>
          <Row className="mb-2 text-center">
            <Col md="6 mx-auto"><Input type="text" placeholder="Namnet ditt.." name="registerName" value={this.state.registerName} onChange={this.handleFormInput.bind(this)} onKeyPress={this.handleKeyPress} /></Col>
          </Row>
          <Row className="mb-2 text-center">
            <Col md="6 mx-auto"><Input type="text" placeholder="E-posten din.." name="registerMail" value={this.state.registerMail} onChange={this.handleFormInput.bind(this)} onKeyPress={this.handleKeyPress} /></Col>
          </Row>
          <Row className="mb-2">
            <Col md="6 mx-auto"><Input type="password" placeholder="Lösenordet ditt.." name="registerPass" value={this.state.registerPass} onChange={this.handleFormInput.bind(this)} onKeyPress={this.handleKeyPress} /></Col>
          </Row>
          <Button onClick={this.registerUser.bind(this)} color="success">{this.state.loading === true ? <Spinner /> : 'Skapa konto'}</Button>
          {this.state.error === true ? erroring : ''}
        </Col>
      </Row>
    )

    return (
      <div className="registerpage">
        {global.auth === !true ? registerForm() : <Redirect to="/mitt-konto" />}
      </div >
    );
  }

  componentDidMount() {
    document.title = 'Registrera ett nytt konto';
  }
}

export default withRouter(RegisterPage);
