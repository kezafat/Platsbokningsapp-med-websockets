import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from './NavBar'
import Footer from './Footer'
import MoviePage from './MoviePage'
import MovieDetail from './MovieDetail'
import StartPage from './StartPage'
import Auditoria from './Auditoria'
import Auditorium from './Auditorium'
import AccountPage from './account/AccountPage'
import AdminPage from './account/AdminPage'
import AdminEditPage from './account/AdminEditPage'
import LoginPage from './account/LoginPage'
import RegisterPage from './account/RegisterPage'
import UserPage from './account/UserPage'
import { Route, } from 'react-router-dom'
import { Spinner, } from 'reactstrap'
import BookShow from './BookShow'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faStar);



class App extends Component {
  constructor(props) {
    super(props);
    this.setAuth = this.setAuth.bind(this);
    global.auth = false;
    global.user = {};
    this.state = {
      setAuth: this.setAuth,
      display: "welcome",
      linkVal: <Spinner />,
    }
  }

  setAuth(data, userdata = {}) {
    global.auth = data.authStatus;
    global.user = userdata;
    this.setState(data);
  }

  render() {
    return (
      <div className="App">
        <header>
          <NavBar state={this.state} />
        </header>
        <main className="container">
          <Route exact path="/" component={StartPage} />
          <Route exact path="/biografer" component={Auditoria} />
          <Route path="/visningar/:auditorium/:date/:time" component={BookShow} />
          <Route path="/biografer/:name" component={Auditorium} />
          <Route path="/filmer/:title" component={MovieDetail} />
          <Route exact path="/filmer" component={MoviePage} />
          <Route exact path="/konto" render={(props) => <div><AccountPage state={this.state} {...props} /></div>} />
          <Route exact path="/logga-in" render={() => <div><LoginPage state={this.state} /></div>} />
          <Route exact path="/registrera-konto" render={() => <div><RegisterPage state={this.state} /></div>} />
          <Route exact path="/mitt-konto" render={() => <div><UserPage state={this.state} /></div>} />
          <Route exact path="/admin" render={() => <div><AdminPage state={this.state} /></div>} />
          <Route path="/admin/redigera/:id" render={() => <div><AdminEditPage state={this.state} /></div>} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
