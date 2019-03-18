import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class CarouselStartPage extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            autoPlay: true,
            focusOnSelect: true,
            fade: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (<Container>
            <Row className="carousel my-4">
                <Col>
                    <Slider {...settings}>
                        <img src={require('../images/diehard-wallpaper4.jpg')} alt="film-poster-slide" />
                        <img src={require('../images/diehard-wallpaper6.jpg')} alt="film-poster-slide" />
                        <img src={require('../images/diehard-wallpaper5.jpg')} alt="film-poster-slide" />
                    </Slider>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default CarouselStartPage