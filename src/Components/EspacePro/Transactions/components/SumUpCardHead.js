import React, { Component } from 'react'
import "./SumUpCardHead.scss"
import AgenceMap from "../../../AgenceComponent/AgenceMap"
export class SumUpCardHead extends Component {
    render() {
        return (
            <div className="sumup-card-container">

<AgenceMap displayMapLink={false} nameEntreprise={this.props.nameEntreprise} typeEntreprise={this.props.typeEntreprise} transactions={this.props.transactions} locaAgence={this.props.locaAgence} legende={this.props.legende} />
            </div>
        )
    }
}

export default SumUpCardHead
