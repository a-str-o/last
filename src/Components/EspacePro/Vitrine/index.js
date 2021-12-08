import React, { Component } from 'react'
import FillVitrine from './FillVitrine'
import AvancementComponent from "./AvancementComponent"
import VitrineEntete from "./VitrineEnTete"
import VitrinePhoto from "./VitrinePhoto"

export class Vitrine extends Component {
    render() {
        return (
            <div className="estimations-display--container">
                <div className="right-pannel-title">
                    <div className="title--container">
                    <h5 className="agence--title">Ma vitrine</h5>
                    </div>
                </div>
                <AvancementComponent />
                <div className="vitrine--container">
                <VitrineEntete />
                <VitrinePhoto />
                <FillVitrine />
                </div>
                
            </div>
        )
    }
}

export default Vitrine
