import React from 'react';
import './Heros.scss';

function PageHero(props) {
    
    return (
        <div className="page-hero-section">
            <section id="page-hero">
            </section>

            <div className="page-hero-bottom-side">
                <div className={'page-hero-bottom-side-container ' + props.className}>
                    <h3> {props.h3} </h3>
                    <p> {props.p} </p>
                </div>
            </div>

        </div>
    );
}

export default PageHero;