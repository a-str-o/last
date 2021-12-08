import React, { Component } from 'react'
import './numberDisplay.scss'
export class NumberDiplay extends Component {
    render() {
        return (
            <span className="kpi--value">

                {this.props.number}
            </span>
        )
    }
}

export default NumberDiplay
