import React, { Component } from 'react'
import './box.scss'

export class Caddre extends Component {

    render() {
        return (
            <div className="box--container">
                <div className="Packs-Pro1">
                    <div className="box--title-container">
                        <div className="box--title-inner">
                            <h2 className="box--title-text">
                                <strong className="font">{this.props.title} </strong>
                            </h2>
                        </div>
                    </div>
                    <div className="box--description-container">
                        <div className="box--description-inner">
                            <p className="box--description-text">{this.props.description}</p>
                        </div>
                    </div>
                    <div className="box--link-container">
                        <div className="box--link-inner">
                            <p className="box--link-text">
                                <a className="box--link" href={this.props.knowmorelink}>En savoir plus</a>
                                <span class="dashicons dashicons-arrow-right-alt2">
                                {" "}>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="box--image-container">
                        <div className="box--image-inner">
                            <div className="pic1">
                                <img className="pic" src={this.props.img_src}  alt={this.props.img_alt} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Caddre
