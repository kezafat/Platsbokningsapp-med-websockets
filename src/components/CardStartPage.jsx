import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CardStartPage extends Component {
    render() {
        let { id, title, images, productionCountries, productionYear, genre, director, description } = this.props.movie;
        return (
            <CardGroup className="mt-2 mb-2" key={id} >
                <Card className="d-flex flex-column">
                    <CardBody>
                        <CardTitle><h5 className="text-light mt-auto">{title}</h5></CardTitle>
                        <CardImg top width="100%" src={require('../images/' + images)} className="img-fluid img-thumbnail" alt="Movie-Posters" />
                        <CardSubtitle className="text-light my-2"> [{productionCountries}] {director}<br />
                            {genre} {productionYear}</CardSubtitle>
                        <CardText className="mt-auto">{description.substr(0, 150) + (' ... ')}<a href={`/filmer/${this.props.movie.title.replace(/ /g, "-").replace(/:/g, "").toLowerCase()}`} className="films-link text-light">läs vidare </a></CardText>
                        <Link to='/visningar/' className="btn btn-outline-danger text-light d-block">BILJETTER</Link>

                    </CardBody>
                </Card>
            </CardGroup>
        )
    }

}

export default CardStartPage


