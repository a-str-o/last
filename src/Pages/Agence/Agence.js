import React, { Component } from 'react';
import AgenceComponent from '../../Components/AgenceComponent/AgenceComponent';
import ReactGA from "react-ga";
class Agence extends Component {
    componentDidMount(){
            ReactGA.pageview(this.props.location.pathname+ this.props.location.search);

    }

    render() {
        return (
            <div className="main-container-agence">
                <AgenceComponent/>
            </div>
        );
    }
}

export default Agence;
