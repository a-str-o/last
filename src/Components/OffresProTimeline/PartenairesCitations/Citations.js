import React, { Component } from 'react'

export class Citations extends Component {
    constructor (props){
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <div className="cit--container">
                <div className="citation--header">
                    <div className="citation--title">
                        <h2 className="citation-title-text">{this.props.title}</h2>
                    </div>
                </div>
                <div className="citation--subtitle">
                    <div className="citation--subtitle-inner">
                        <h6 className="subtitle-head">{this.props.agence}</h6>
                        <p className="subtitle-desc">{this.props.city}</p>
                    </div>
                </div>
                <div className="citation--content">
                    <div className="content-inner">
                        <p className="content-text">
                        {this.props.cit}
                        </p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Citations
