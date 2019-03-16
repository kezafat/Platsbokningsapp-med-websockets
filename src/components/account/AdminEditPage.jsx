import React, { Component } from 'react';
import { Jumbotron, Spinner, Button, Table, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import FR from '../../fetchRouter.js';

class AdminEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      listView: true,
      currentShowID: "",
      actionLoading: false,
      showCfg: {
        auditoriumID: "",
        showID: "",
        movieID: "",
        showDate: "",
        showTime: ""
      }
    }
  }

  async fetchDbMovie() {
    const { id } = this.props.match.params;
    const fetchData = {
      endpoint: "/json/movies/id/" + id
    }
    const res = await FR(fetchData, "GET");
    this.setState({ loaded: true, movie: res, listView: true, actionLoading: false })
  }

  async deleteShow(event) {
    if (this.state.actionLoading) {
      return;
    }
    this.setState({ actionLoading: true })
    const fetchData = {
      endpoint: "/json/shows/" + event.target.id
    }
    FR(fetchData, "DELETE").then(() => {
      this.fetchDbMovie()
    })
  }

  async newShow(event) {
    if (this.state.actionLoading) {
      return;
    }
    this.setState({ actionLoading: true })
    const fetchData = {
      endpoint: "/json/auditoria"
    }
    const auditorias = await FR(fetchData, "GET");
    const saveCfg = {
      auditoriumID: "show.auditorium._id",
      showID: "id",
      movieID: this.state.movie._id,
      showDate: "show.date",
      showTime: "show.time",
    }
    this.setState({ showCfg: saveCfg, auditorias: auditorias, listView: false, action: "POST", actionLoading: false })
  }

  async editShow(event) {
    if (this.state.actionLoading) {
      return;
    }
    this.setState({ actionLoading: true })
    const thisShowID = event.target.id;
    let fetchData = {
      endpoint: "/json/shows/id/" + thisShowID
    }
    const show = await FR(fetchData, "GET");

    fetchData = {
      endpoint: "/json/auditoria"
    }
    const auditorias = await FR(fetchData, "GET");
    const saveCfg = {
      auditoriumID: show.auditorium._id,
      showID: thisShowID,
      movieID: this.state.movie._id,
      showDate: show.date,
      showTime: show.time,
    }
    this.setState({ showCfg: saveCfg, currentShowID: thisShowID, auditorias: auditorias, listView: false, action: "PUT", actionLoading: false });
  }

  async saveShow(event) {
    event.preventDefault();
    if (this.state.actionLoading) {
      return;
    }
    this.setState({ actionLoading: true })
    let form = event.target;
    const dynamicEndpoint = this.state.action === "POST" ? `/json/shows/` : `/json/shows/${this.state.currentShowID}`;

    const fetchData = {
      endpoint: dynamicEndpoint,
      body: {
        auditorium: form.elements.auditoriumID.value,
        time: form.elements.showTime.value,
        date: form.elements.showDate.value,
        movie: this.state.movie._id,
      }
    }

    await FR(fetchData, this.state.action).then((res) => {
      this.fetchDbMovie();
    })
  }

  backToListView() {
    this.setState({ listView: true });
  }

  readForms(event) {
    this.setState({
      showCfg: {
        [event.target.name]: event.target.value
      }
    })
  }

  render() {
    const showTables = () => (
      <React.Fragment>
        <Button className="mb-2 float-right" color="primary" onClick={this.newShow.bind(this)}>{this.state.actionLoading ? <Spinner size="sm" /> : '+ Ny visning'}</Button>
        <Table striped hover responsive size="sm">
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
                <td>
                  <Button className="btn btn-danger" size="sm" onClick={this.deleteShow.bind(this)} id={show._id}>{this.state.actionLoading ? <Spinner size="sm" /> : 'X'}</Button>
                </td>
                <td>
                  <Button className="btn btn-warning" size="sm" onClick={this.editShow.bind(this)} id={show._id}>{this.state.actionLoading ? <Spinner size="sm" /> : "Ä"}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    )

    const showForms = () => (
      < React.Fragment >
        <Form onSubmit={this.saveShow.bind(this)}>
          <FormGroup>
            <Label for="editableForms">Vilken biograf?</Label>
            <Input type="select" name="auditoriumID" id="editableForms" onChange={this.readForms.bind(this)} value={this.state.showCfg.auditoriumID}>
              {this.state.auditorias.map((audio, id) => {
                return (<option value={audio._id} key={id}>{audio.name}</option>)
              })}
            </Input>
            <Row>
              <Col>
                <Label for="dateField">Datum</Label>
                <Input type="date" name="showDate" id="dateField" value={this.state.showCfg.showDate} onChange={this.readForms.bind(this)} required />
              </Col>
              <Col>
                <Label for="timeField">Tid</Label>
                <Input type="time" name="showTime" id="timeField" value={this.state.showCfg.showTime} onChange={this.readForms.bind(this)} required />
              </Col>
            </Row>
          </FormGroup>
          <Row>
            <Col>
              <Button color="success" className="btn-block" onClick={this.backToListView.bind(this)}>{this.state.actionLoading ? <Spinner size="sm" /> : 'Avbryt'}</Button>
            </Col>
            <Col>
              <Button color="danger" className="btn-block" type="submit">{this.state.actionLoading ? <Spinner size="sm" /> : 'Spara'}</Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment >
    )

    const movieBox = () => (
      <Jumbotron>
        <h3 className="text-dark">Visningar för: {this.state.movie.title}</h3>
        <div>
          {this.state.listView ? showTables() : showForms()}
        </div>
      </Jumbotron>
    )

    return (
      <React.Fragment>
        <Link to={"/admin"} className="btn btn-success btn-block mb-2">Tillbaka till filmöversikt</Link>
        {this.state.loaded ? movieBox() : <Spinner size="sm" />}
      </React.Fragment>
    );
  }

  componentDidMount() {
    global.auth === "admin" ? this.fetchDbMovie() : this.props.history.push("/konto");
    document.title = "Redigera | " + this.props.match.params.id;
  }
}

export default withRouter(AdminEditPage);