import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from './NavBar'
import Footer from './Footer'
//import MoviesContainer from './MoviesContainer'
import Shows from './Shows'
import BookingConfirmationContainer from './BookingConfirmationContainer'
import MoviePage from './MoviePage'
import MovieDetail from './MovieDetail'
import StartPage from './StartPage'
import Auditoria from './Auditoria'
import Auditorium from './Auditorium'
import BookShow from './BookShow'
import { Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faStar);



class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main className="main-content container mt-4 mb-3">
          <Route exact path="/" component={StartPage} />
          {/* <Route exact path="/visningar" component={BookingConfirmationContainer} /> */}
          <Route path="/visningar/:auditorium/:date/:time" component={BookShow} />
          <Route exact path="/filmer" component={MoviePage} />
          <Route path="/filmer/:title" component={MovieDetail} />
          <Route path="/visningar/" component={Shows} />
          <Route path="/bokningsbekräftelse/" component={BookingConfirmationContainer} />
          <Route exact path="/biografer" component={Auditoria} />
          <Route path="/biografer/:name" component={Auditorium} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
