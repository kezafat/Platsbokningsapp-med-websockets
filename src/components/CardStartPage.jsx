import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CardStartPage extends Component {
    render() {
        let { id, title, images, productionCountries, productionYear, genre, director, description } = this.props.movie;
        return (
            <CardGroup className="d-flex mt-2 mb-2" key={id}>
                <Card className="flex-column">
                    <CardBody className="mt-auto">
                        <CardTitle><h5 className="text-light">{title}</h5></CardTitle>
                        <CardImg top width="100%" src={require('../images/' + images)} className="img-thumbnail" alt="Posters" />
                        <CardSubtitle className="text-light my-2"> [{productionCountries}] {director}<br />
                            {genre} {productionYear}</CardSubtitle>
                        <CardText>{description.substr(0, 200)} <CardText onPress={'...'}> <a href={`/filmer/${this.props.movie.title.replace(/ /g, "-").replace(/:/g, "").toLowerCase()}`} className="films-link"> ... läs vidare </a></CardText></CardText>
                        <Link to={'/filmer/'} className="btn btn-outline-danger text-light">Visningar</Link>
                    </CardBody>
                </Card>
            </CardGroup>
        )
    }
}
export default CardStartPage