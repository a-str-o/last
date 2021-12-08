import React, { Component } from 'react'
import PricingAreaButtons from '../PricingRightSide/PricingAreaButtons';
import PricingAreaHouse from '../PricingRightSide/PricingAreaHouse'
import {withRouter} from 'react-router-dom';


export class AdressePrice extends Component {
    render() {
        return (
            <div className="adresse-price--container">

                <PricingAreaHouse />
                <PricingAreaButtons />
                
            </div>
        )
    }
}

export default withRouter(AdressePrice)
