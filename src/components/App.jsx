import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from './NavBar'
import Footer from './Footer'
import MoviesContainer from './MoviesContainer'
import Shows from './Shows'
import StartPage from './StartPage'
import Auditoria from './Auditoria'
import Auditorium from './Auditorium'
import BookShow from './BookShow'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <NavBar />
      </header>
      <main className="main-content container mt-4 mb-3">
        <Route exact path="/" component={StartPage} />
        <Route path="/filmer" component={MoviesContainer} />
        <Route exact path="/visningar" component={Shows} />
          <Route path="/visningar/:auditorium/:date/:time" component={BookShow} />
        <Route exact path="/biografer" component={Auditoria} /> 
        <Route path ="/biografer/:name" component={Auditorium} />
      </main>
      <Footer />
      </div>
    );
  }
}

export default App;
