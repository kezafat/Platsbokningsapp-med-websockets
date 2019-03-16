import React, { Component } from 'react';
import { Jumbotron, Spinner, Card, CardImg, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom'
import FR from '../../fetchRouter.js';

class AdminMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      movies: [],
    }
  }

  async fetchDbMovies() {
    const fetchData = {
      endpoint: "/json/movies/"
    }
    const res = await FR(fetchData, "GET");
    this.setState({ loaded: true, movies: res })
  }

  render() {
    const movieBoxes = () => (
      <Jumbotron>
        <h4 className="text-center text-dark">Välj en film för att redigera visningarna.</h4>
        <CardDeck>
          {this.state.movies.map((movie, index) => (
            <Card key={index}>
              <Link to={"/admin/redigera/" + movie._id}>
                <CardImg top width="100%" src={require('../../images/' + movie.images[0])} />
              </Link>
            </Card>
          ))}
        </CardDeck>
      </Jumbotron>
    )



    return (
      this.state.loaded ? movieBoxes() : <Spinner />
    );
  }
  componentDidMount() {
    this.fetchDbMovies();
  }
}

export default AdminMovies;