import React from 'react';
import './style.scss';

class HeaderEstimationDesktop extends React.Component {

    state = {
        ...this.props,
        width: '10%'
    }

    // we use component did update in order to set the state of
    // our progress bar with this.setState. This will animate the
    // progress bar, else it will move without animation.
    componentDidUpdate(prevProps) {
        if (this.props.step !== prevProps.step) {
            if(this.props.step!==0){
          this.setState({
              ...this.props,
              // ! make sure to change if number of steps increases/decreases
              width: `${14 * this.props.step}%`
          })
        }
        else {
            this.setState({
                ...this.props,
                // ! make sure to change if number of steps increases/decreases
                width: `100%`
            })
        }
    }
      }

    render () {
        return <div className="desktop">
            <div className="headerContainer">
                <p>{this.state.header.h3} : {this.state.header.p}</p>
                {/* {this.state.estimationState.activeStep !== 0 ? (
                    <p>{this.state.estimationState.currentAdress}</p>
                ): ''} */}
                {''}
            </div>
            <div className="progressBar">
                <div className="progressBarProgress"
                style={{
                    width: this.state.width
                }}></div>
            </div>
        </div>;
    }

}

export default HeaderEstimationDesktop;