import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class CarouselStartPage extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            fade: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (<Container fluid className="carousel mb-2">
            <Slider {...settings}>
                <img src={require('../images/diehard-wallpaper4.jpg')} alt="" />
                <img src={require('../images/diehard-wallpaper5.jpg')} alt="" />
                <img src={require('../images/diehard-wallpaper6.jpg')} alt="" />
            </Slider>
        </Container>
        )
    }
}

export default CarouselStartPage