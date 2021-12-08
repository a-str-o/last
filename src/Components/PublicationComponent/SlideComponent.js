import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SlideComponent.scss'

class SlideComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingArticle: true,
            article : {}
        }
    }
    



    componentDidMount() {
        this.getArticle()

    }


    render() {

        return (
          <>
          <div>
          <img src={this.props.element.image} alt={this.props.alt} />
          </div>
          </>

        );
    }
}
const mapStateToProps = (state) => {


    // console.log(state)
    return {

    };
};
export default connect(mapStateToProps)(SlideComponent);
