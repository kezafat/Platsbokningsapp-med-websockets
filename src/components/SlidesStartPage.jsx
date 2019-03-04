import React from 'react';
import ReactDOM from 'react-dom';
import {
    Container
} from 'reactstrap';
import { ReactComponent } from '*.svg';

const Slides = ({ url }) => {
    const styles = {
        imgFluid: `url(${url})`,
    };
}
const Arrow = ({ direction, clickFunction, glyph }) => (
    <div className={`slide-arrow ${direction}`}
        onClick={clickFunction}>
        {glyph}
    </div>
);
return (
    <Container>
        <div className="carousel-slides"> style ={styles}>
       </div>
    </Container>
);






