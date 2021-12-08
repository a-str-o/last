import React, { Component } from 'react';

import { connect } from 'react-redux';
import './PublicationComponent.scss';

import BeatLoader from "react-spinners/BeatLoader";

import { css } from "@emotion/core";

import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import SlideComponent from './SlideComponent.js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const properties={
    duration : 5000,
    transitionDuration : 500,
    infinite : true,
    indicators : true

}
class MagHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingArticle: true,
            article : {}
        }
    }
    



    componentDidMount() {

    }


    render() {

        return (
            <div className="article--root-container">
            {this.state.loadingArticle ? (
                <BeatLoader color='#2ea7f9' loading={true} css={override} size={15} />

                      ) :
                      
                      ( 
        
<>
<Slide {...properties}>
    {this.props.publicationState.forEach(element => {
        return (
<SlideComponent content={element} />

        )
    })}
</Slide>
            </>
                      )}
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    const uid = state.auth.email;
    const estimation = state.userEstimation;
    const publication = state.publication.publications;
    const activePublication = state.publication.activePublication;
    const currentPublication = state.publication.currentPublication;

    // console.log(state)
    return {
        uid: uid,
        estimation: estimation,
        publicationState: publication,
        activePublication: activePublication,
        currentPublication: currentPublication
    };
};
export default connect(mapStateToProps)(MagHeader);
