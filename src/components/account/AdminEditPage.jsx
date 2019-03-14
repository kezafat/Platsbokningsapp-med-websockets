import React, { Component } from 'react';
import { Jumbotron, Spinner, Button, ButtonGroup, Table } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import FR from '../../fetchRouter.js';

class AdminEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  async fetchDbMovies() {
    const { id } = this.props.match.params;
    const fetchData = {
      endpoint: "/json/movies/id/" + id
    }
    const res = await FR(fetchData, "GET");
    this.setState({ loaded: true, movie: res })
  }

  async deleteShow(event) {
    console.log("would DELETE:", event.target.id)
  }

  async editShow(event) {
    const id = event.target.id;
    const fetchData = {
      endpoint: "/admin/editshow/" + id,
      body: {
        name: "hamid",
        title: "titeln"
      }
    }
    const res = await FR(fetchData);
    console.log(res);
  }

  render() {
    const showTables = () => (
      <Table striped>
        <thead>
          <tr>
            <th>Salong</th>
            <th>Datum</th>
            <th>Tid</th>
            <th>Radera</th>
            <th>Ändra</th>
          </tr>
        </thead>
        <tbody>
          {this.state.movie.shows.map((show, index = 1) => (
            <tr key={index}>
              <td>{show.auditorium.name}</td>
              <td>{show.date}</td>
              <td>{show.time}</td>
              <td><Button className="btn btn-danger" onClick={this.deleteShow} id={show._id}>&#9760;</Button></td>
              <td><Button className="btn btn-warning" onClick={this.editShow} id={show._id}>&#9881;</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )

    const movieBox = () => (
      <Jumbotron>
        <h3 className="text-dark">Visningar för: {this.state.movie.title}</h3>
        <div>
          {showTables()}
        </div>
      </Jumbotron>
    )

    return (
      <div>
        <ButtonGroup>
          <Link to={"/admin"} className="btn btn-success ">Tillbaka till filmöversikt</Link>
          <Button className="btn btn-danger ">Lägg till ny visning</Button>
        </ButtonGroup>
        {this.state.loaded ? movieBox() : <Spinner />}
      </div>
    );
  }
  componentDidMount() {
    global.auth === "admin" ? this.fetchDbMovies() : this.props.history.push("/konto")
    // this.fetchDbMovies();
  }
}

export default withRouter(AdminEditPage);