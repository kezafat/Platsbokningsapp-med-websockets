import React, { Component } from 'react';
import {
    Container, Row, Col
} from 'reactstrap';
import { Slides } from './SlidesStartPage';
import { Arrow } from './SlidesStartPage';


const imgUrls = [
    './images/diehard-wallpaper4.jpg',
    './images/diehard-wallpaper5.jpg',
    './images/diehard-wallpaper6.jpg',

];
class CarouselStartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImageIndex: 0
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }
    previousSlide() {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index
        });

    }

    nextSlide() {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="carousel">
                            <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" />
                            <Slides url={imgUrls[this.state.currentImageIndex]} />
                            <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
                        </div>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CarouselStartPage;
