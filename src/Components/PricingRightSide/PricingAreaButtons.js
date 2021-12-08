import React, { Component } from 'react'

export class PricingAreaButtons extends Component {
    render() {
        return (
            <div>
                <p className="button-subtitle">Estimez votre bien en fonction de ses caractéristiques</p>
                <button className="button button-primary btn-estimation-map" onClick={()=> {window.location.href="/estimation"}}>Estimez un bien</button>
            </div>
        )
    }
}

export default PricingAreaButtons
