import React, { Component } from 'react';
import {
    Carousel, CarouselItem, CarouselCaption, CarouselIndicators, CarouselControl,
} from 'reactstrap';

const carouselSlides = [
    {
        src: 'diehard-wallpaper4.jpg',
        altText: '',
        caption: 'DieHard special',
    },
    {
        src: 'diehard-wallpaper5.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2',
    },
    {
        src: 'diehard-wallpaper6.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3',
    }
];
class CarouselStartPage extends Component {
    constructor(props) {
        super(props)
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === carouselSlides.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? carouselSlides.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        //{this.state.carouselSlides && this.state.carouselSlides.map(....)
        const slides = carouselSlides.map((item) => {
            return (
                <CarouselItem
                    //className="carouselImg"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                //src={item.images}
                >
                    <img className="d-block w-100" src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div className='MoviesCarousel'>
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators carouselSlides={carouselSlides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        );
    }
}

export default CarouselStartPage
