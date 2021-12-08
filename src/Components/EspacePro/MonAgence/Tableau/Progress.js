import React, { Component } from 'react'
import './Progress.scss'
import ProgressBar from "@ramonak/react-progress-bar";

export class Progress extends Component {
    render() {
        return (
            <div>
                <h5 className="progress-count">{this.props.progress} %</h5>
                <ProgressBar 
    completed={this.props.progress}
    bgColor="#2da7f9"
    labelAlignment="outside"
    isLabelVisible={false}
    labelColor="#e80909"
    />
                
            </div>
        )
    }
}

export default Progress
