import React from 'react';
import './style.scss';

class HeaderTransactionDesktopPro extends React.Component {

    state = {
        ...this.props,
        width: '0%'
    }

    // we use component did update in order to set the state of
    // our progress bar with this.setState. This will animate the
    // progress bar, else it will move without animation.
    componentDidUpdate(prevProps) {
        if (this.props.step !== prevProps.step) {
          this.setState({
              ...this.props,
              // ! make sure to change if number of steps increases/decreases
              width: `${25 * this.props.step}%`
          })
        }
      }

    render () {
        return <div className="desktop-pro">
            <div className="headerContainer">
                <p>{this.state.header.h3}: {this.state.header.p}</p>
                {this.state.espacePro.activeStep !== 0 ? (
                    <p>{this.state.espacePro.currentAdress}</p>
                ): ''}
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

export default HeaderTransactionDesktopPro;