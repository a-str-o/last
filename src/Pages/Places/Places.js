import React, { Component } from 'react';
import PlacesComponent from '../../Components/Places/places';
import './places.scss'
import ReactGA from 'react-ga'
class Places extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }

    render() {
        return (
            <div className="main-container">
                <PlacesComponent/>
            </div>
        );
    }
}

export default Places;
