import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CardStartPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { title, images, productionCountries, productionYear, genre, director, description } = this.props.movie;
        return (
            <div>
                <CardGroup className="mt-4 mb-2">
                    <Card>
                        <CardBody>
                            <CardTitle><h5>{title}</h5></CardTitle>
                            <CardImg top width="100%" src={require('../images/' + images)} alt="Posters" />
                            <CardSubtitle className="my-2"><p>[{productionCountries}] {director}<br />
                                {genre} {productionYear}</p></CardSubtitle>
                            <CardText><p>{description.substr(0, 200) + '...'}</p></CardText>
                            <Link to={'/visningar/'} className="btn btn-outline-danger">Visningar</Link>
                        </CardBody>
                    </Card>
                </CardGroup>
            </div>
        )
    }
}
export default CardStartPage