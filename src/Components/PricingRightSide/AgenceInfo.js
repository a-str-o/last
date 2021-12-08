import React, { Component } from 'react'
import "./PricingRightSide.scss"
import logo_agenz_white from '../../assets/img/logo_agenz_white.jpeg'

export class AgenceInfo extends Component { 
    render() {
        return (
            <a className="agence--link" href={`https://www.agenz.ma/agence-immobiliere/casablanca/${this.props.name.replace(/\./g, '-').replace(/ /g, '-').replace(/é/g, 'e').replace(/ô/g, 'o')}/a/${this.props.url}`} target="_blank" rel="noreferrer">
            <div className="list-agency--container">
                <div className="agence-left">
<div className="agence-img--container">
<img src={this.props.image ? this.props.image : logo_agenz_white} alt="meilleures agences immobilières à casablanca"/>
</div>
    <div className="agence--details-container">
        <p className="agence--name">{this.props.name}</p>
        <p className="agence--description">{this.props.description}</p>

    </div>
    </div>
    <div class="vl"></div>
    <div className="agence-right">
        <div className="transac-count">
            <p className="number--agency">{this.props.nombreTransac}</p>
        </div>
        <div className="right-text--container">
            <p className="right--subtitle">ventes ajoutées</p>
            </div>
    </div>
        
            </div>
            </a>
        )
    }
}

export default AgenceInfo
