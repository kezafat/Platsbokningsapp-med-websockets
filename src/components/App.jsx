import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from  './NavBar'
import Footer from './Footer'
import MoviesContainer from './MoviesContainer'
import ShowContainer from './ShowContainer'
import StartPage from './StartPage'
import AuditoriaContainer from './AuditoriaContainer'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Route exact path="/" component={StartPage} />
        <Route path="/filmer" component={MoviesContainer} />
        <Route path="/visningar" component={ShowContainer} />
        <Route path="/biografer" component={AuditoriaContainer} /> 
      </main>
      <Footer />
      </div>
    );
  }
}

export default App;
