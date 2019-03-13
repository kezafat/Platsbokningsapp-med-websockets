import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CardStartPage extends Component {
    render() {
        let { title, images, productionCountries, productionYear, genre, director, description } = this.props.movie;
        return (
            <CardGroup className="mt-2 mb-2">
                <Card>
                    <CardBody>
                        <CardTitle><h5 className="text-light">{title}</h5></CardTitle>
                        <CardImg top width="100%" src={require('../images/' + images)} alt="Posters" />
                        <CardSubtitle className="text-light my-2"> [{productionCountries}] {director}<br />
                            {genre} {productionYear}</CardSubtitle>
                        <CardText>{description.substr(0, 200) + ' ... '}</CardText>
                        <Link to={'/visningar/'} className="btn btn-outline-danger">Visningar</Link>
                    </CardBody>
                </Card>
            </CardGroup>
        )
    }
}
export default CardStartPage